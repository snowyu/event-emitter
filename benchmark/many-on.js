// Benchmark comparing performance of event emit for many listeners
// To run it, do following in memoizee package path:
//
// $ npm install eventemitter2 signals event-emitter
// $ node benchmark/many-on.js

import forEach from '../src/util/object-for-each'
import pad from '../src/util/string-pad'

import createEventEmitter from '../src/event-emitter'
import events from 'events'
import eventEmitter from 'event-emitter'
import eventEmitter2 from 'eventemitter2'
import signals from 'signals'

const now = Date.now
const count = 1000000
const data = {}
let time
let eeX, ee, native, ee2, signals
const a = {}
const  b = {}
let i

eeX = (function () {
	var ee = createEventEmitter();
	ee.on('test', function () { return arguments; });
	ee.on('test', function () { return arguments; });
	return ee.on('test', function () { return arguments; });
}());

ee = (function () {
	var ee = eventEmitter();
	ee.on('test', function () { return arguments; });
	ee.on('test', function () { return arguments; });
	return ee.on('test', function () { return arguments; });
}());

native = (function () {
	var ee = events;
	ee = new ee.EventEmitter();
	ee.on('test', function () { return arguments; });
	ee.on('test', function () { return arguments; });
	return ee.on('test', function () { return arguments; });
}());

ee2 = (function () {
	var ee = eventEmitter2;
	ee = new ee.EventEmitter2();
	ee.on('test', function () { return arguments; });
	ee.on('test', function () { return arguments; });
	return ee.on('test', function () { return arguments; });
}());

signals = (function () {
	var Signal = signals
	  , ee = { test: new Signal() };
	ee.test.add(function () { return arguments; });
	ee.test.add(function () { return arguments; });
	ee.test.add(function () { return arguments; });
	return ee;
}());

console.log("Emit for 3 listeners", "x" + count + ":\n");

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
