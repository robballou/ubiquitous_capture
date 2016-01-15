var activity = {
  newMessage: function(event) {
    if (event.has('pinboard') && event.is('pinboard', 'link')) {
      console.log('Activty: new link!');
    }
  },
};

module.exports = activity;
