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
    assert.deepEqual(e._events, {});

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

  it('should test listeners throw error', () => {
    var e = new EventEmitter;
    var err;
    var called = false;
    var listener
    var errType
    var evtName
    var expectErr = new Error('FooError')
    var expectListener = ()=> {
      throw expectErr
    }

    e.on('foo', expectListener);

    e.on('error', (error, errorType, name, l) => {
      errType = errorType
      err = error
      evtName = name
      listener = l
    });

    e.on('foo', ()=> {called = true});

    e.emit('foo')
    assert.equal(errType, 'notify')
    assert.equal(err, expectErr)
    assert.equal(evtName, 'foo')
    assert.equal(listener, expectListener)
    assert.ok(called)
  });

  it('should test listeners throw error async', async () => {
    var e = new EventEmitter;
    var err;
    var called = false;
    var listener
    var errType
    var evtName
    var expectErr = new Error('FooError')
    var expectListener = async ()=> {
      await wait(50);
      throw expectErr
    }

    e.on('foo', expectListener);

    e.on('error', (error, errorType, name, l) => {
      errType = errorType
      err = error
      evtName = name
      listener = l
    });

    e.on('foo', ()=> {called = true});

    await e.emitAsync('foo')
    assert.equal(errType, 'notify')
    assert.equal(err, expectErr)
    assert.equal(evtName, 'foo')
    assert.equal(listener, expectListener)
    assert.ok(called)
  });
});

export async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
