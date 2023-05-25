import {assert} from "chai"

import unify from '../src/unify'
import ee from '../src/event-emitter'

describe('unify async', () => {
	it('should unify', async function() {
		var x = {}, y = {}, z = {}, count, count2, count3;

		ee(x);
		ee(y);
		ee(z);

		count = 0;
		count2 = 0;
		count3 = 0;
		x.on('foo', async function () { ++count; });
		y.on('foo', function () { ++count2; this.result=16});
		z.on('foo', function () { ++count3; });

		await x.emitAsync('foo');
		assert.equal(count, 1, "Pre unify, x");
		assert.equal(count2, 0, "Pre unify, y");
		assert.equal(count3, 0, "Pre unify, z");

		unify(x, y);
		assert.equal(x.__ee__, y.__ee__, "Post unify y");
		assert.equal(await x.emitAsync('foo'), 16, "unify(x,y): event foo result");
		assert.equal(count, 2, "Post unify, x");
		assert.equal(count2, 1, "Post unify, y");
		assert.equal(count3, 0, "Post unify, z");

		await y.emitAsync('foo');
		assert.equal(count, 3, "Post unify, on y, x");
		assert.equal(count2, 2, "Post unify, on y, y");
		assert.equal(count3, 0, "Post unify, on y, z");

		unify(x, z);
		assert.equal(x.__ee__, x.__ee__, "Post unify z");
		await x.emitAsync('foo');
		assert.equal(count, 4, "Post unify z, x");
		assert.equal(count2, 3, "Post unify z, y");
		assert.equal(count3, 1, "Post unify z, z");
	})
	it('should unify On empty', async function() {
		var x = {}, y = {}, z = {}, count, count2, count3;

		ee(x);
		ee(y);
		ee(z);

		count = 0;
		count2 = 0;
		count3 = 0;
		y.on('foo', function () { ++count2; });
		await x.emitAsync('foo');
		assert.equal(count, 0, "Pre unify, x");
		assert.equal(count2, 0, "Pre unify, y");
		assert.equal(count3, 0, "Pre unify, z");

		unify(x, y);
		assert.equal(x.__ee__, y.__ee__, "Post unify y");
		x.on('foo', function () { ++count; });
		await x.emitAsync('foo');
		assert.equal(count, 1, "Post unify, x");
		assert.equal(count2, 1, "Post unify, y");
		assert.equal(count3, 0, "Post unify, z");

		await y.emitAsync('foo');
		assert.equal(count, 2, "Post unify, on y, x");
		assert.equal(count2, 2, "Post unify, on y, y");
		assert.equal(count3, 0, "Post unify, on y, z");

		unify(x, z);
		assert.equal(x.__ee__, z.__ee__, "Post unify z");
		z.on('foo', function () { ++count3; });
		await x.emitAsync('foo');
		assert.equal(count, 3, "Post unify z, x");
		assert.equal(count2, 3, "Post unify z, y");
		assert.equal(count3, 1, "Post unify z, z");
	})
	it('should unify Many', async function() {
		var x = {}, y = {}, z = {}, count, count2, count3;

		ee(x);
		ee(y);
		ee(z);

		count = 0;
		count2 = 0;
		count3 = 0;
		x.on('foo', function () { ++count; });
		y.on('foo', function () { ++count2; });
		y.on('foo', function () { ++count2; });
		z.on('foo', function () { ++count3; });

		await x.emitAsync('foo');
		assert.equal(count, 1, "Pre unify, x");
		assert.equal(count2, 0, "Pre unify, y");
		assert.equal(count3, 0, "Pre unify, z");

		unify(x, y);
		assert.equal(x.__ee__, y.__ee__, "Post unify y");
		await x.emitAsync('foo');
		assert.equal(count, 2, "Post unify, x");
		assert.equal(count2, 2, "Post unify, y");
		assert.equal(count3, 0, "Post unify, z");

		await y.emitAsync('foo');
		assert.equal(count, 3, "Post unify, on y, x");
		assert.equal(count2, 4, "Post unify, on y, y");
		assert.equal(count3, 0, "Post unify, on y, z");

		unify(x, z);
		assert.equal(x.__ee__, x.__ee__, "Post unify z");
		await x.emitAsync('foo');
		assert.equal(count, 4, "Post unify z, x");
		assert.equal(count2, 6, "Post unify z, y");
		assert.equal(count3, 1, "Post unify z, z");
	})
});

