import {assert} from "chai";

import ee from '../src/wrap-event-emitter'

describe('bubbling', () => {
	it('should bubbling result', () => {
		const ee1 = ee()
    let count = 0
    ee1.result = 0
		ee1.on('test', function(a, b) {
      const r = this.result || 0
      this.result = a + b + r
      ++count
		})
		ee1.on('test', function(a, b) {
      const r = this.result || 0
      this.result = a + b + r
      ++count
		})
		ee1.on('test', function(a, b) {
      ++count
		})

    assert.equal(ee1.emit('test', 1, 2), 6);
    assert.equal(count, 3);
	});

  it('should stop bubbling', () => {
		const ee1 = ee()
    let count = 0
    ee1.result = 0
		ee1.on('test', function(a, b) {
      const r = this.result || 0
      this.result = a + b + r
      ++count
		})
		ee1.on('test', function(a, b) {
      this.stopped = true
      ++count
		})
		ee1.on('test', function(a, b) {
      const r = this.result || 0
      this.result = a + b + r
      ++count
		})

    assert.equal(ee1.emit('test', 1, 2), 3);
    assert.equal(count, 2);
	});
});
