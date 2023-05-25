import {assert} from "chai";
import {EventEmitter} from '../src'

describe('EventEmitter', () => {
  it('should test num-args', () => {
    var e = new EventEmitter(),
    num_args_emited = [];

    e.on('numArgs', function() {
      var numArgs = arguments.length;
      num_args_emited.push(numArgs);
    });

    e.emit('numArgs');
    e.emit('numArgs', null);
    e.emit('numArgs', null, null);
    e.emit('numArgs', null, null, null);
    e.emit('numArgs', null, null, null, null);
    e.emit('numArgs', null, null, null, null, null);

    assert.deepEqual([0, 1, 2, 3, 4, 5], num_args_emited);
  })
  it('should test num-args for async', async () => {
    var e = new EventEmitter(),
    num_args_emited = [];

    e.on('numArgs', async function() {
      var numArgs = arguments.length;
      num_args_emited.push(numArgs);
    });

    await e.emitAsync('numArgs');
    await e.emitAsync('numArgs', null);
    await e.emitAsync('numArgs', null, null);
    await e.emitAsync('numArgs', null, null, null);
    await e.emitAsync('numArgs', null, null, null, null);
    await e.emitAsync('numArgs', null, null, null, null, null);

    assert.deepEqual([0, 1, 2, 3, 4, 5], num_args_emited);
  })
})
