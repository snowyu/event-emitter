import {assert} from "chai";

import pipe from '../src/pipe'
import ee from '../src/event-emitter';

describe('pipe', () => {
	it('should pipe', () => {
		var x = {}, y = {}, z = {}, count, count2, count3, vPipe;

		ee(x);
		x = Object.create(x);
		ee(y);
		ee(z);

		count = 0;
		count2 = 0;
		count3 = 0;
		x.on('foo', function () {
			++count;
		});
		y.on('foo', function () {
			++count2;
		});
		z.on('foo', function () {
			++count3;
		});

		x.emit('foo');
		assert.equal(count, 1, "Pre pipe, x");
		assert.equal(count2, 0, "Pre pipe, y");
		assert.equal(count3, 0, "Pre pipe, z");

		vPipe = pipe(x, y);
		x.emit('foo');
		assert.equal(count, 2, "Post pipe, x");
		assert.equal(count2, 1, "Post pipe, y");
		assert.equal(count3, 0, "Post pipe, z");

		y.emit('foo');
		assert.equal(count, 2, "Post pipe, on y, x");
		assert.equal(count2, 2, "Post pipe, on y, y");
		assert.equal(count3, 0, "Post pipe, on y, z");

		pipe(x, z);
		x.emit('foo');
		assert.equal(count, 3, "Post pipe z, x");
		assert.equal(count2, 3, "Post pipe z, y");
		assert.equal(count3, 1, "Post pipe z, z");

		vPipe.close();
		x.emit('foo');
		assert.equal(count, 4, "Close pipe y, x");
		assert.equal(count2, 3, "Close pipe y, y");
		assert.equal(count3, 2, "Close pipe y, z");

	});
});
