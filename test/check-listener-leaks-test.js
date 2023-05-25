import {assert} from "chai";
import {EventEmitter} from '../src'

describe('EventEmitter', () => {
  it('should check listener leaks', () => {
    var oldError = console.error;
    var oldTrace = console.trace;
    console.error = function(){};
    console.trace = function(){};

    var e = new EventEmitter();

    // default
    for (var i = 0; i < 10; i++) {
      e.on('default', function() {});
    }
    assert.ok(!e._events['default'].hasOwnProperty('warned'));
    e.on('default', function() {});
    assert.ok(e._events['default'].warned, 'should warned on default event');

    // specific
    e.setMaxListeners(5);
    for (var i = 0; i < 5; i++) {
      e.on('specific', function() {});
    }
    assert.ok(!e._events['specific'].hasOwnProperty('warned'));
    e.on('specific', function() {});
    assert.ok(e._events['specific'].warned, 'should warned on specific event');

    // only one
    e.setMaxListeners(1);
    e.on('only one', function() {});
    assert.ok(!e._events['only one'].hasOwnProperty('warned'));
    e.on('only one', function() {});
    assert.ok(e._events['only one'].hasOwnProperty('warned'), 'should warned on only one event');

    // unlimited
    e.setMaxListeners(0);
    for (var i = 0; i < 1000; i++) {
      e.on('unlimited', function() {});
    }
    assert.ok(!e._events['unlimited'].hasOwnProperty('warned'), 'should not warned on unlimited');

    // process-wide
    EventEmitter.defaultMaxListeners = 42;
    e = new EventEmitter();

    for (var i = 0; i < 42; ++i) {
      e.on('fortytwo', function() {});
    }
    assert.ok(!e._events['fortytwo'].hasOwnProperty('warned'));
    e.on('fortytwo', function() {});
    assert.ok(e._events['fortytwo'].hasOwnProperty('warned'));
    delete e._events['fortytwo'].warned;

    EventEmitter.defaultMaxListeners = 44;
    e.on('fortytwo', function() {});
    assert.ok(!e._events['fortytwo'].hasOwnProperty('warned'));
    e.on('fortytwo', function() {});
    assert.ok(e._events['fortytwo'].hasOwnProperty('warned'));

    // but _maxListeners still has precedence over defaultMaxListeners
    EventEmitter.defaultMaxListeners = 42;
    e = new EventEmitter();
    e.setMaxListeners(1);
    e.on('uno', function() {});
    assert.ok(!e._events['uno'].hasOwnProperty('warned'));
    e.on('uno', function() {});
    assert.ok(e._events['uno'].hasOwnProperty('warned'), 'should warned on uno event');

    // chainable
    assert.strictEqual(e, e.setMaxListeners(1), 'setMaxListeners chainable');
    console.error = oldError;
    console.trace = oldTrace;
  });
});
