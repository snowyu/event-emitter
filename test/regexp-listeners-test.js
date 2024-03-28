import {assert, expect} from "chai";

import {EventEmitter, RegExpEventSymbol} from '../src'
import ee from '../src/wrap-event-emitter'

describe('regexp-listeners', () => {
	it('should emit', () => {
    const x = ee()
    let count = 0
    let count1 = 0
    let count2 = 0
    x.on(/^foo/, () => {
      count++
    })
    x.on('foo', () => {
      count1++
    })
    x.emit('foo')
    x.emit('foobar')

    assert.equal(count, 2, '/^foo/ trigger count')
    assert.equal(count1, 1, '"foo" trigger count')
    x.emit('foo3')
    assert.equal(count, 3, '/^foo/ trigger count')
    assert.equal(count1, 1, '"foo" trigger count')

    x.once(/bar/, () => {
      count2++
    })
    x.emit('foobar')
    assert.equal(count, 4, '/^foo/ trigger count')
    assert.equal(count2, 1, '/bar/ trigger count')
    assert.equal(count1, 1, '"foo" trigger count')

    x.emit('foobar')
    assert.equal(count, 5, '/^foo/ trigger count')
    assert.equal(count2, 1, '/bar/ trigger count')
    assert.equal(count1, 1, '"foo" trigger count')
  })

  it('should emitAsync', async () => {
    const x = ee()
    let count = 0
    let count1 = 0
    let count2 = 0
    x.on(/^foo/, () => {
      count++
    })
    x.on('foo', () => {
      count1++
    })
    await x.emitAsync('foo')
    await x.emitAsync('foobar')

    assert.equal(count, 2, '/^foo/ trigger count')
    assert.equal(count1, 1, '"foo" trigger count')
    await x.emitAsync('foo3')
    assert.equal(count, 3, '/^foo/ trigger count')
    assert.equal(count1, 1, '"foo" trigger count')

    x.once(/bar/, () => {
      count2++
    })
    await x.emitAsync('foobar')
    assert.equal(count, 4, '/^foo/ trigger count')
    assert.equal(count2, 1, '/bar/ trigger count')
    assert.equal(count1, 1, '"foo" trigger count')

    await x.emitAsync('foobar')
    assert.equal(count, 5, '/^foo/ trigger count')
    assert.equal(count2, 1, '/bar/ trigger count')
    assert.equal(count1, 1, '"foo" trigger count')
  })

  it('should removeAllListeners', () => {
    var actualRemoved = [];
    var expectedRemoved = ['bar', 'baz', 'baz', /^ba/, /^foo/, /^foo/];

    function getOnRemoveListener(actualRemoved) {
      return function onRemoveListener(type) {
        actualRemoved.push(type)
      }
    }

    function listener() {}

    var e1 = new EventEmitter();
    e1.on('foo', listener);
    e1.on('bar', listener);
    e1.on('baz', listener);
    e1.on('baz', listener);
    e1.on(/^ba/, listener);
    e1.on(/^foo/, listener);
    e1.on(/^foo/, listener);

    var fooListeners = e1.listeners('foo');
    var barListeners = e1.listeners('bar');
    var bazListeners = e1.listeners('baz');
    var rFooListeners = e1.listeners(/^foo/);
    var rBaListeners = e1.listeners(/^ba/);

    assert.equal(fooListeners.length, 1);
    assert.equal(barListeners.length, 1);
    assert.equal(bazListeners.length, 2);
    assert.equal(rFooListeners.length, 2);
    assert.equal(rBaListeners.length, 1);

    assert.equal(e1.listenerCount('foo'), 1);
    assert.equal(e1.listenerCount('bar'), 1);
    assert.equal(e1.listenerCount('baz'), 2);
    assert.equal(e1.listenerCount(/^foo/), 2);
    assert.equal(e1.listenerCount(/^ba/), 1);

    e1.on('removeListener', getOnRemoveListener(actualRemoved));
    e1.removeAllListeners('bar');
    e1.removeAllListeners('baz');
    e1.removeAllListeners(/^ba/);
    assert.deepEqual(e1.listeners('foo'), [listener]);
    assert.deepEqual(e1.listeners('bar'), []);
    assert.deepEqual(e1.listeners('baz'), []);
    assert.deepEqual(e1.listeners(/^ba/), []);

     // after calling removeAllListeners,
    // the old listeners array should stay unchanged
    assert.deepEqual(fooListeners, [listener]);
    assert.deepEqual(barListeners, [listener]);
    assert.deepEqual(bazListeners, [listener, listener]);
    assert.deepEqual(rFooListeners, [listener, listener]);
    assert.deepEqual(rBaListeners, [listener]);

    // after calling removeAllListeners,
    // new listeners arrays are different from the old
    assert.notEqual(e1.listeners('bar'), barListeners);
    assert.notEqual(e1.listeners('baz'), bazListeners);
    assert.notEqual(e1.listeners(/^ba/), rBaListeners);
    e1.removeAllListeners(/^foo/);
    assert.deepEqual(e1.listeners(/^foo/), []);

    assert.deepEqual(actualRemoved, expectedRemoved);
    assert.deepEqual(Object.keys(e1._events), ['foo', 'removeListener'])
    assert.deepEqual(Object.keys(e1._events[RegExpEventSymbol]), [])
    e1.removeAllListeners();
    assert.deepEqual(Object.keys(e1._events), [])
    assert.strictEqual(e1._events[RegExpEventSymbol], undefined)

    e1.on('foo', listener);
    e1.on('bar', listener);
    e1.on('baz', listener);
    e1.on('baz', listener);
    e1.on(/^ba/, listener);
    e1.on(/^foo/, listener);
    e1.on(/^foo/, listener);
    e1.removeAllListeners();
    assert.deepEqual(Object.keys(e1._events), [])
    assert.strictEqual(e1._events[RegExpEventSymbol], undefined)

    e1.on('foo', listener);
    e1.on('bar', listener);
    e1.on('baz', listener);
    e1.on('baz', listener);
    e1.on(/^ba/, listener);
    e1.on(/^foo/, listener);
    e1.on(/^foo/, listener);

    actualRemoved = []
    e1.on('removeListener', getOnRemoveListener(actualRemoved));
    e1.removeAllListeners();
    assert.deepEqual(Object.keys(e1._events), [])
    assert.strictEqual(e1._events[RegExpEventSymbol], undefined)
    assert.deepEqual(actualRemoved, ['foo',...expectedRemoved]);

 })

})