var logAgent = {
  canRun: function(event) {
    var app = event.app;
    if (app.locals.settings.hasOwnProperty('log') && app.locals.settings.log) {
      return true;
    }
    return false;
  },
  newMessage: function(event) {
    if (logAgent.canRun(event)) {
      console.log(event.message);
    }
  }
};

module.exports = logAgent;
