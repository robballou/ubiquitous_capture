var activity = {
  newMessage: function(event) {
    if (event.has('pinboard') && event.is('pinboard', 'link')) {
      console.log('Activty: new link!');
    }
    else if (event.has('git')) {
      console.log('Activity: new git activity!');
    }
  },
};

module.exports = activity;
