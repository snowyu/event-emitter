import {assert} from "chai";
import {EventEmitter} from '../src'

describe('EventEmitter', () => {
  function listener() {}
  function listener2() {}

  describe('listener', () => {
    it('should listeners with only one item', function()  {
      var e1 = new EventEmitter();

      e1.on('foo', listener);
      var fooListeners = e1.listeners('foo');
      assert.deepEqual(e1.listeners('foo'), [listener]);
      assert.equal(e1.listenerCount('foo'), 1);

      e1.removeAllListeners('foo');
      assert.equal(e1.listenerCount('foo'), 0)
      assert.deepEqual(e1.listeners('foo'), []);
      assert.deepEqual(fooListeners, [listener]);

    });

    it('should listeners is a copy', function()  {
      var e2 = new EventEmitter();
      e2.on('foo', listener);
      var e2ListenersCopy = e2.listeners('foo');
      assert.deepEqual(e2ListenersCopy, [listener]);
      assert.deepEqual(e2.listeners('foo'), [listener]);

      e2ListenersCopy.push(listener2);
      assert.deepEqual(e2.listeners('foo'), [listener]);
      assert.deepEqual(e2ListenersCopy, [listener, listener2]);

    });

    it('should listeners with two items', function()  {
      var e3 = new EventEmitter();
      e3.on('foo', listener);
      var e3ListenersCopy = e3.listeners('foo');
      e3.on('foo', listener2);
      assert.deepEqual(e3.listeners('foo'), [listener, listener2]);
      assert.deepEqual(e3ListenersCopy, [listener]);
    });
  });
});
