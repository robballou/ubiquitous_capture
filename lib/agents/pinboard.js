/**
 * Handles polling pinboard.in for new links.
 */

var sqlite = require('sqlite3');
var request = require('../request');
var Message = require('../message');

var pinboard = {
  newMessage: function(event) {
    if (!event.has('pinboard')) {
      return false;
    }

    // figure out what type of message this is
    if (event.message.data.pinboard === 'poll') {
      pinboard.poll(event);
    }
    else if (event.message.data.pinboard === 'clear') {
      pinboard.clear(event);
    }
  },

  /**
   * Clear the links
   */
  clear: function(event) {
    var db = pinboard.db();
    db.run('DELETE FROM links');
    db.close();
  },

  /**
   * Poll for links.
   */
  poll: function(event) {
    request(
      {
        url: 'https://api.pinboard.in/v1/posts/recent',
        qs: {
          'auth_token': event.app.locals.settings.pinboard.token,
          format: 'json',
        },
        cache: 'pinboard.poll.json',
        cacheTime: event.app.locals.settings.pinboard.cacheTime || 10,
      },
      function (body) {
        var links = JSON.parse(body);
        var db = pinboard.db();

        var stmt = db.prepare('SELECT * FROM links WHERE hash=?');
        links.posts.forEach(function(link) {
          var result = stmt.get(link.hash, function(error, rows) {
            if (error) {
              console.error(error);
              return;
            }

            // insert the link if it doesn't exist
            if (!rows) {
              var insert = db.prepare('INSERT INTO links VALUES(?)');
              insert.run(link.hash, function(error) {
                if (error) {
                  console.error('Could not add link');
                }
              });

              insert.finalize();

              // post back a message with the new link
              var message = new Message({
                pinboard: 'link',
                link: JSON.parse(JSON.stringify(link)),
              });
              event.app.locals.collector.message(event.app, message);
            }
          });
        });
        stmt.finalize();

        db.close();
      }
    );
  },

  db: function() {
    var db = new sqlite.Database('pinboard.db');
    db.run('CREATE TABLE IF NOT EXISTS links (hash TEXT, PRIMARY KEY (hash))');
    return db;
  },
};

module.exports = pinboard;
