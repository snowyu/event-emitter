import {assert} from "chai";
import {EventEmitter} from '../src'

describe('EventEmitter', () => {
  describe('remove listeners', () => {
    var count = 0;

    function listener1() {
      count++;
    }

    function listener2() {
      count++;
    }

    function listener3() {
      count++;
    }

    it('should removeListener emits and listeners array becomes empty', function()  {
      var e1 = new EventEmitter();

      var emitted = false;
      e1.on('hello', listener1);
      e1.on('removeListener', function(name, cb) {
        assert.equal(name, 'hello');
        assert.equal(cb, listener1);
        emitted = true;
      });

      e1.removeListener('hello', listener1);
      assert.deepEqual([], e1.listeners('hello'));

      assert.ok(emitted, 'removeListener did fire');
    });

    it('should removing inactive handler dose nothing', function()  {
      var e2 = new EventEmitter();

      var emitted = false;
      e2.on('hello', listener1);
      e2.on('removeListener', function () {
        emitted = true;
      });
      e2.removeListener('hello', listener2);
      assert.deepEqual([listener1], e2.listeners('hello'));

      assert.ok(!emitted, 'removeListener did not fire');
    });

    it('should removeListener only removes one handler', function()  {
      var e3 = new EventEmitter();

      var emitted = false;
      e3.on('hello', listener1);
      e3.on('hello', listener2);
      e3.on('removeListener', function(name, cb) {
        emitted = true;
        assert.equal(name, 'hello');
        assert.equal(cb, listener1);
      });
      e3.removeListener('hello', listener1);
      assert.deepEqual([listener2], e3.listeners('hello'));

      assert.ok(emitted, 'removeListener did fired');
    });

    it('should regression: removing listener with in removeListener', function()  {
      var e4 = new EventEmitter();

      function remove1() { assert.ok(false); }
      function remove2() { assert.ok(false); }

      var fired = 0;
      e4.on('removeListener', function(name, cb) {
        fired += 1;
        if (cb !== remove1) return;
        this.target.removeListener('quux', remove2);
        this.target.emit('quux');
      });
      e4.on('quux', remove1);
      e4.on('quux', remove2);
      e4.removeListener('quux', remove1);

      assert.equal(fired, 2);
    });

  });
});
