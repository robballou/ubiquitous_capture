var JsonObject = function() {
  this.data = {};
};

/**
 * Return the thing used in .stringify()
 */
JsonObject.prototype.objectify = function () {
  return this.data;
};

/**
 * Convert to JSON.
 */
JsonObject.prototype.stringify = function() {
  return JSON.stringify(this.objectify());
};

module.exports = JsonObject;
