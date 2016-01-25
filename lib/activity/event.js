var util = require('util');
var JsonObject = require('../json_object.js');

var ActivityEvent = function(agent, data) {
  this.agent = agent;
  this.data = {};
  this.data.timestamp = data.timestamp || new Date().getTime();
};

util.inherits(ActivityEvent, JsonObject);

/**
 * Make sure this.agent gets dropped into the data.
 */
ActivityEvent.prototype.objectify = function() {
  this.data.agent = this.agent;
  return ActivityEvent.super_.prototype.objectify.apply();
};

module.exports = ActivityEvent;
