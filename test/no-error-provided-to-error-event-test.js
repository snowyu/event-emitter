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
    let errArgs = [];

    const e = new EventEmitter();

    e.on('error', function (er) {
      assert.equal();
      errArgs = [].slice.call(arguments);
    });

    e.emit('error', undefined, 1,2,3,4);

    assert.equal(errArgs.length, 5, 'error got caught');
    assert.ok(errArgs[0] instanceof Error, 'error created');
    assert.equal(errArgs[1], 1, 'error got caught 1');
    assert.equal(errArgs[4], 4, 'error got caught 4');
  })

  it('should raise error without error listener', () => {
    let hasError = false;
    let actualErrMsg;

    const e = new EventEmitter();
    const expectedErrMsg = 'hello from error message';

    assert.throws(function() {
      e.emit('error', expectedErrMsg);
    }, expectedErrMsg)
  })
})
