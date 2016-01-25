var util = require('util');
var JsonObject = require('./json_object');

var MessageEvent = function(app, message, options) {
  this.message = message;
  this.timestamp = options.timestamp || new Date().getTime();
};

util.inherits(MessageEvent, JsonObject);

MessageEvent.prototype.has = function(item) {
  return this.message.data.hasOwnProperty(item);
};

MessageEvent.prototype.is = function(item, value) {
  return this.message.data[item] == value;
};

MessageEvent.prototype.objectify = function() {
  return {
    message: this.message,
    timestamp: this.timestamp,
  };
};

module.exports = MessageEvent;
