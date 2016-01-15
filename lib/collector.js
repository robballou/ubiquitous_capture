/**
 * The Collector is in charge of gathering messages and sending them onto
 * agents who do things with them.
 */

var EventEmitter = require('events');

var Message = require('./message');
var agents = require('./agents');

var collector = {};
collector.messages = new EventEmitter();

collector.createMessage = function(req) {
  var thisMessage = new Message();
  thisMessage.data = req.body;
  return thisMessage;
};

collector.message = function(message) {
  agents.getAgents(collector);
  var event = {
    message: message,
    app: collector.app,
  }
  collector.messages.emit('new', event);
};

module.exports = collector;
