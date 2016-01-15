var should = require('should');
var MessageEvent = require('../lib/message_event');
var Message = require('../lib/message');
describe('MessageEvent', function() {
  it('.has() should return true if a message has the item', function() {
    var message = new Message({ item: 123 });
    var ev = new MessageEvent({}, message);
    should(ev.has('item')).be.true;
  });

  it('.has() should return false if a message does not have the item', function() {
    var message = new Message({ item: 123 });
    var ev = new MessageEvent({}, message);
    should(ev.has('foo')).be.false;
  });
});
