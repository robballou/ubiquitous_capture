var requireDir = require('require-dir');

var agents = {};

agents.getAgents = function(collector) {
  agents.loadedAgents = requireDir('./agents');
  for (var agent in agents.loadedAgents) {
    if (agents.loadedAgents.hasOwnProperty(agent)) {
      collector.messages.addListener('new', agents.loadedAgents[agent].newMessage);
    }
  }
};

module.exports = agents;
