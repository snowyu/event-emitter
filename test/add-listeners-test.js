import {assert} from "chai";
import {EventEmitter} from '../src'

describe('EventEmitter', () => {
  it('should add listeners', () => {
    var e = new EventEmitter();

    var events_new_listener_emited = [];
    var listeners_new_listener_emited = [];
    var times_hello_emited = 0;

    // sanity check
    assert.equal(e.addListener, e.on);

    e.on('newListener', function(event, listener) {
      events_new_listener_emited.push(event);
      listeners_new_listener_emited.push(listener);
    });

    function hello(a, b) {
      times_hello_emited += 1;
      assert.equal('a', a);
      assert.equal('b', b);
      assert.equal(this.type, 'hello')
    }
    e.on('hello', hello);

    var foo = function foo() {};
    e.once('foo', foo);

    e.emit('hello', 'a', 'b');


    // just make sure that this doesn't throw:
    var f = new EventEmitter();
    f.setMaxListeners(0);


    assert.deepEqual(['hello', 'foo'], events_new_listener_emited);
    assert.deepEqual([hello, foo], listeners_new_listener_emited);
    assert.equal(1, times_hello_emited);
  });
});
