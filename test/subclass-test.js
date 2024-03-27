import {assert} from "chai";
import {inherits} from 'inherits-ex';

import {EventEmitter} from '../src'

describe('EventEmitter', () => {
  it('should test subclass', () => {
    inherits(MyEE, EventEmitter);

    function MyEE(cb) {
      this.once(1, cb);
      this.emit(1);
      this.removeAllListeners();
      EventEmitter.call(this);
    }

    var called = false;
    var myee = new MyEE(function() {
      called = true;
    });


    function ErrorEE() {
      this.emit('error', new Error('blerg'));
    }
    inherits(ErrorEE, EventEmitter);

    assert['throws'](function() {
      new ErrorEE();
    }, /blerg/);


    function MyEE2() {
      EventEmitter.call(this);
    }

    MyEE2.prototype = new EventEmitter();

    var ee1 = new MyEE2();
    var ee2 = new MyEE2();

    ee1.on('x', function () {});

    assert.equal(EventEmitter.listenerCount(ee2, 'x'), 0);
    assert.equal(called, true);
    assert.equal(Object.keys(myee._events).length, 0);

  })
})
