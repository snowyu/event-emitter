import {assert} from "chai";
import {EventEmitter} from '../src'

describe('EventEmitter', () => {
  it('should test method names', () => {
    var E = EventEmitter.prototype;
    assert.equal(E.constructor.name, 'EventEmitter');
    assert.equal(E.on, E.addListener);  // Same method.
    assert.equal(E.off, E.removeListener);  // Same method.
  });
})
