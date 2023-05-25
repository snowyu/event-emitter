import {assert} from "chai";
import {EventEmitter} from '../src'

describe('EventEmitter', () => {
  it('should test no error provided to error event', () => {
    let hasError = false;

    const e = new EventEmitter();

    e.on('error', function (er) {
      assert.ok(er instanceof Error, 'error created');
      assert.equal();
      hasError = true;
    });

    e.emit('error');

    assert.ok(hasError, 'error got caught');

  })

  it('should test no error provided (multi args) on error event', () => {
    let hasError = false;

    const e = new EventEmitter();

    e.on('error', function (er) {
      assert.ok(er instanceof Error, 'error created');
      assert.equal();
      hasError = arguments.length;
    });

    e.emit('error', undefined, 1,2,3,4);

    assert.equal(hasError, 5, 'error got caught');

  })
})
