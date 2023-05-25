import {assert} from "chai";
import {EventEmitter} from '../src'

describe('EventEmitter', () => {
  it('should test set max listeners side-effects', () => {
    var e = new EventEmitter;

    assert.equal(e._events, undefined);
    e.setMaxListeners(5);
    assert.equal(e._events, undefined);

  })
})
