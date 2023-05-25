import {assert} from "chai";
import {EventEmitter} from '../src'

describe('EventEmitter', () => {
  it('should test max listeners', () => {
    var gotEvent = false;

    var e = new EventEmitter();

    e.on('maxListeners', function() {
      gotEvent = true;
    });

    // Should not corrupt the 'maxListeners' queue.
    e.setMaxListeners(42);

    assert.throws(function() {
      e.setMaxListeners(NaN);
    });

    assert.throws(function() {
      e.setMaxListeners(-1);
    });

    assert.throws(function() {
      e.setMaxListeners("and even this");
    });

    e.emit('maxListeners');
    assert(gotEvent, true);

  });
})
