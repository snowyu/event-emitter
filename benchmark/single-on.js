'use strict';

// Benchmark comparing performance of event emit for single listener
// To run it, do following in memoizee package path:
//
// $ npm install eventemitter2 signals, event-emitter
// $ node benchmark/single-on.js

import forEach from '../src/util/object-for-each'
import pad from '../src/util/string-pad'

import createEventEmitter from '../src/event-emitter'
import events from 'events'
import eventEmitter from 'event-emitter'
import eventEmitter2 from 'eventemitter2'
import signals from 'signals'

const now = Date.now

let time, count = 1000000, i, data = {}
  , eeX, ee, native, ee2, signals, a = {}, b = {};

eeX = (function () {
	var ee = createEventEmitter();
	return ee().on('test', function () { return arguments; });
}());

ee = (function () {
	var ee = eventEmitter();
	return ee().on('test', function () { return arguments; });
}());

native = (function () {
	var ee = events;
	return (new ee.EventEmitter()).on('test', function () { return arguments; });
}());

ee2 = (function () {
	var ee = eventEmitter2;
	return (new ee.EventEmitter2()).on('test', function () { return arguments; });
}());

signals = (function () {
	var Signal = signals
	  , ee = { test: new Signal() };
	ee.test.add(function () { return arguments; });
	return ee;
}());

console.log("Emit for single listener", "x" + count + ":\n");

i = count;
time = now();
while (i--) {
	eeX.emit('test', a, b);
}
data["events-ex (this implementation)"] = now() - time;

i = count;
time = now();
while (i--) {
	ee.emit('test', a, b);
}
data["event-emitter"] = now() - time;

i = count;
time = now();
while (i--) {
	native.emit('test', a, b);
}
data["EventEmitter (Node.js native)"] = now() - time;

i = count;
time = now();
while (i--) {
	ee2.emit('test', a, b);
}
data.EventEmitter2 = now() - time;

i = count;
time = now();
while (i--) {
	signals.test.dispatch(a, b);
}
data.Signals = now() - time;

forEach(data, function (value, name, obj, index) {
	console.log(index + 1 + ":",  pad.call(value, " ", 5), name);
}, null, function (a, b) {
	return this[a] - this[b];
});
