var MessageEvent = function(app, message) {
  this.app = app;
  this.message = message;
};

MessageEvent.prototype.has = function(item) {
  return this.message.data.hasOwnProperty(item);
};

MessageEvent.prototype.is = function(item, value) {
  return this.message.data[item] == value;
};

module.exports = MessageEvent;
