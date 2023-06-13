import {assert} from "chai";

import hasListeners from '../src/has-listeners'
import ee from '../src/wrap-event-emitter';

describe('hasListeners', () => {
	it('should any listeners', () => {
		let x, y;
		assert.equal(hasListeners(true), false, "Primitive");
		assert.equal(hasListeners({ events: [] }), false, "Other object");
		assert.equal(hasListeners(x = ee()), false, "Emitter: empty");

		x.on('test', y = function () {});
		assert.equal(hasListeners(x), true, "Emitter: full");
		x.off('test', y);
		assert.equal(hasListeners(x), false, "Emitter: empty but touched");
		x.once('test', y = function () {});
		assert.equal(hasListeners(x), true, "Emitter: full: Once");
		x.off('test', y);
		assert.equal(hasListeners(x), false, "Emitter: empty but touched by once");
	});

	it('should specific listeners', () => {
		let x, y;
		assert.equal(hasListeners(true, 'test'), false, "Primitive");
		assert.equal(hasListeners({ events: [] }, 'test'), false, "Other object");
		assert.equal(hasListeners(x = ee(), 'test'), false, "Emitter: empty");

		x.on('test', y = function () {});
		assert.equal(hasListeners(x, 'test'), true, "Emitter: full");
		assert.equal(hasListeners(x, 'foo'), false, "Emitter: full, other event");
		x.off('test', y);
		assert.equal(hasListeners(x, 'test'), false, "Emitter: empty but touched");
		assert.equal(hasListeners(x, 'foo'), false, "Emitter: empty but touched, other event");

		x.once('test', y = function () {});
		assert.equal(hasListeners(x, 'test'), true, "Emitter: full: Once");
		assert.equal(hasListeners(x, 'foo'), false, "Emitter: full: Once,  other event");
		x.off('test', y);
		assert.equal(hasListeners(x, 'test'), false, "Emitter: empty but touched by once");
		assert.equal(hasListeners(x, 'foo'), false, "Emitter: empty but touched by once, other event");

	});
});
