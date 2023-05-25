import {assert} from "chai";
import {EventEmitter} from '../src'

const hasOwnProperty = Object.hasOwnProperty

describe('EventEmitter', () => {
  it('should test listeners side effects', () => {
    var e = new EventEmitter;
    var fl;  // foo listeners

    fl = e.listeners('foo');
    assert.ok(Array.isArray(fl));
    assert.equal(fl.length, 0);
    assert.deepEqual(e._events, undefined);

    e.on('foo', assert.fail);
    fl = e.listeners('foo');
    assert.equal(e._events.foo, assert.fail);
    assert.ok(Array.isArray(fl));
    assert.equal(fl.length, 1);
    assert.equal(fl[0], assert.fail);

    e.listeners('bar');
    assert.ok(!hasOwnProperty.call(e._events, 'bar'));

    e.on('foo', assert.ok);
    fl = e.listeners('foo');

    assert.ok(Array.isArray(e._events.foo));
    assert.equal(e._events.foo.length, 2);
    assert.equal(e._events.foo[0], assert.fail);
    assert.equal(e._events.foo[1], assert.ok);

    assert.ok(Array.isArray(fl));
    assert.equal(fl.length, 2);
    assert.equal(fl[0], assert.fail);
    assert.equal(fl[1], assert.ok);

  });
});
