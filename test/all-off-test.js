import {assert} from "chai";

import ee from '../src/event-emitter'
import allOff from '../src/all-off'

describe('all-off', () => {
	it('should remove all listeners', () => {
		var x, count, count2;

		x = ee();
		count = 0;
		count2 = 0;
		x.on('foo', function () {
			++count;
		});
		x.on('foo', function () {
			++count;
		});
		x.on('bar', function () {
			++count2;
		});
		x.on('bar', function () {
			++count2;
		});
		allOff(x, 'foo');
		x.emit('foo');
		x.emit('bar');
		assert.equal(count, 0, "foo off: type");
		assert.equal(count2, 2, "foo off: ohter type");

		count = 0;
		count2 = 0;
		x.on('foo', function () {
			++count;
		});
		x.on('foo', function () {
			++count;
		});
		x.on('bar', function () {
			++count2;
		});
		x.on('bar', function () {
			++count2;
		});
		allOff(x);
		x.emit('foo');
		x.emit('bar');
		assert.equal(count, 0, "All off: type");
		assert.equal(count2, 0, "All off: other type");
	});
});
