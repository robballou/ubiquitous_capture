var requireDir = require('require-dir');

var agents = {
  loadedAgents: null,
};

agents.getAgents = function(app) {
  if (!agents.loadedAgents) {
    agents.loadedAgents = requireDir('./agents');

    // load agents from the settings
    if (app.locals.settings.hasOwnProperty('agentsDir')) {
      settingsAgents = requireDir(app.locals.settings.agentsDir);
      for (var agent in settingsAgents) {
        if (settingsAgents.hasOwnProperty(agent)) {
          agents.loadedAgents[agent] = settingsAgents[agent];
        }
      }
    }

    // add the event listeners
    for (var agent in agents.loadedAgents) {
      if (agents.loadedAgents.hasOwnProperty(agent)) {
        app.locals.collector.messages.addListener('new', agents.loadedAgents[agent].newMessage);
      }
    }
  }
};

module.exports = agents;
