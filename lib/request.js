var fs = require('fs');
var request = require('request');
var moment = require('moment');

var req = function(info, cb) {
  var url = info.url;
  var cacheName = info.cache || url;
  var cacheFile = 'cache/' + cacheName;
  var cacheTime = moment().subtract(info.cacheTime || 30, 'minutes').calendar();

  fs.open(cacheFile, 'r', function(err, fd) {
    // check if the cache is stale
    if (!err) {
      stats = fs.fstatSync(fd);
      if (stats.mtime > cacheTime) {
        err = 'Cache expired';
      }
    }

    if (err) {
      console.log('requesting');
      request(info, function(error, request, body) {
        if (error) {
          console.error(error);
          return;
        }

        fs.writeFileSync(cacheFile, body);
        cb(body);
      });
      return;
    }

    var data = fs.readFileSync(fd);
    cb(data);
  });
};

module.exports = req;
