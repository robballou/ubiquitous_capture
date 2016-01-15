/**
 * The Collector is in charge of gathering messages and sending them onto
 * agents who do things with them.
 */

var EventEmitter = require('events');

var Message = require('./message');
var agents = require('./agents');
var MessageEvent = require('./message_event');

var collector = {};
collector.messages = new EventEmitter();

collector.createMessage = function(req) {
  return new Message(req.body);
};

collector.message = function(app, message) {
  agents.getAgents(app);
  collector.messages.emit('new', new MessageEvent(app, message));
};

module.exports = collector;
