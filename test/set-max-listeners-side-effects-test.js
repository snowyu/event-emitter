import {assert} from "chai";
import {EventEmitter} from '../src'

describe('EventEmitter', () => {
  it('should test set max listeners side-effects', () => {
    var e = new EventEmitter;

    assert.equal(Object.keys(e._events).length, 0);
    e.setMaxListeners(5);
    assert.equal(Object.keys(e._events).length, 0);

  })
})
