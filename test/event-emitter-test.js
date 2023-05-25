import {assert} from "chai";

import eventEmitter from '../src/event-emitter'

function deepEqu(act, expected, msg) {
	assert.exists(act)
	assert.exists(expected)
	for (const i in expected) {
		assert.equal(act[i], expected[i], msg)
	}
}
describe('event-emitter', () => {
	it('should emit', () => {
		var x = eventEmitter(), y, count, count2, count3, count4, test, listener1, listener2;
		var defaultEvent = {stopped:false, result: undefined};
		x.emit('none');

		test = "Once: ";
		count = 0;
		x.once('foo', function (a1, a2, a3) {
			defaultEvent.target = x;
			deepEqu(this, defaultEvent, test + "Context");
			deepEqu([a1, a2, a3], ['foo', x, 15], test + "Arguments");
			++count;
		});

		x.emit('foobar');
		assert.equal(count, 0, test + "Not invoked on other event");
		x.emit('foo', 'foo', x, 15);
		assert.equal(count, 1, test + "Emitted");
		x.emit('foo');
		assert.equal(count, 1, test + "Emitted once");

		test = "On & Once: ";
		count = 0;
		x.on('foo', listener1 = function (a1, a2, a3) {
			defaultEvent.target = x;
			deepEqu(this, defaultEvent, test + "Context");
			deepEqu([a1, a2, a3], ['foo', x, 15], test + "Arguments");
			++count;
		});
		count2 = 0;
		x.once('foo', listener2 = function (a1, a2, a3) {
			defaultEvent.target = x;
			deepEqu(this, defaultEvent, test + "Context");
			deepEqu([a1, a2, a3], ['foo', x, 15], test + "Arguments");
			++count2;
		});

		x.emit('foobar');
		assert.equal(count, 0, test + "Not invoked on other event");
		x.emit('foo', 'foo', x, 15);
		assert.equal(count, 1, test + "Emitted");
		x.emit('foo', 'foo', x, 15);
		assert.equal(count, 2, test + "Emitted twice");
		assert.equal(count2, 1, test + "Emitted once");
		x.off('foo', listener1);
		x.emit('foo');
		assert.equal(count, 2, test + "Not emitter after off");

		count = 0;
		x.once('foo', listener1 = function () { ++count; });

		x.off('foo', listener1);
		x.emit('foo');
		assert.equal(count, 0, "Once Off: Not emitted");

		count = 0;
		x.on('foo', listener2 = function () {});
		x.once('foo', listener1 = function () { ++count; });

		x.off('foo', listener1);
		x.emit('foo');
		assert.equal(count, 0, "Once Off (multi): Not emitted");
		x.off('foo', listener2);

		test = "Prototype Share: ";

		y = Object.create(x);

		count = 0;
		count2 = 0;
		count3 = 0;
		count4 = 0;
		x.on('foo', function () {
			++count;
		});
		y.on('foo', function () {
			++count2;
		});
		x.once('foo', function () {
			++count3;
		});
		y.once('foo', function () {
			++count4;
		});
		x.emit('foo');
		assert.equal(count, 1, test + "x on count");
		assert.equal(count2, 0, test + "y on count");
		assert.equal(count3, 1, test + "x once count");
		assert.equal(count4, 0, test + "y once count");

		y.emit('foo');
		assert.equal(count, 1, test + "x on count");
		assert.equal(count2, 1, test + "y on count");
		assert.equal(count3, 1, test + "x once count");
		assert.equal(count4, 1, test + "y once count");

		x.emit('foo');
		assert.equal(count, 2, test + "x on count");
		assert.equal(count2, 1, test + "y on count");
		assert.equal(count3, 1, test + "x once count");
		assert.equal(count4, 1, test + "y once count");

		y.emit('foo');
		assert.equal(count, 2, test + "x on count");
		assert.equal(count2, 2, test + "y on count");
		assert.equal(count3, 1, test + "x once count");
		assert.equal(count4, 1, test + "y once count");

		test = "Event: ";
		count = 0;
		count2 = 0;
		x.on('efoo', function () {
			++count;
			this.result = 129;
		});
		x.on('efoo', function () {
			++count;
		});
		x.on('ebar', function () {
			++count2;
			this.result = "hiFirst"
			this.stopped = true;
		});
		x.on('ebar', function () {
			++count2;
			this.result = "hiSec"
		});
		assert.equal(x.emit('efoo'), 129, test + 'foo result');
		assert.equal(x.emit('ebar'), "hiFirst", test + 'bar result');
		assert.equal(count, 2, test + "foo type");
		assert.equal(count2, 1, test + "bar type");
	});
});
