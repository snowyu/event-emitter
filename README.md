### events-ex [![Build Status](https://img.shields.io/travis/snowyu/events-ex.js/master.png)](http://travis-ci.org/snowyu/events-ex.js) [![npm](https://img.shields.io/npm/v/events-ex.svg)](https://npmjs.org/package/events-ex) [![downloads](https://img.shields.io/npm/dm/events-ex.svg)](https://npmjs.org/package/events-ex) [![license](https://img.shields.io/npm/l/events-ex.svg)](https://npmjs.org/package/events-ex) 


Browser-friendly enhanced events most compatible with standard node.js and coffee-script. It's modified from [event-emitter](https://github.com/medikoo/event-emitter) mainly.


### Difference with event-emitter and events

- domain is not supported yet(TODO)
+ **`broken change`**: The event object bubbling Supports 
  + the event object as listener's "this" object. 
  + return the result property of event object to emitter.
  + prevent the rest of listener from be excuted if set the stopped property of event object to true 
  * **`broken change`**: the `emit` return the result of listeners' callback instead of the successful state.
  * **`broken change`**: the listeners' callback function this object is `Event` Object instead of the emitter object.
    * the emitter object is the this.target property now.
+ add the defaultMaxListeners class property to keep compatible.
+ add the setMaxListeners method to keep compatible.
+ add `error`, `newListener` and `removeListener` events to keep compatible.
+ add listeners() method to keep compatible.
+ add listenerCount() class method to keep compatible.


### Installation

	$ npm install event-ex
	
To port it to Browser or any other (non CJS) environment, use your favorite CJS bundler. No favorite yet? Try: [Browserify](http://browserify.org/), [Webmake](https://github.com/medikoo/modules-webmake) or [Webpack](http://webpack.github.io/)

### Usage

Node JS events Usage:

```coffee

EventEmitter = require('event-ex')
inherits     = require('inherits-ex')

# Demo the event object bubbling usage:
class MyDb
  inherits MyDb, EventEmitter
  get: (key)->
    result = @emit 'getting', key
    if isObject result
      return if result.state is ABORT
      return result.result if result.state is DONE
    _get(key)
    
```

event-emitter usage:

```javascript

var ee = require('event-ex/event-emitter');

var emitter = ee({}), listener;

emitter.on('test', listener = function (args) {
  // …emitter logic
});

emitter.once('test', function (args) {
  // …invoked only once(!)
  //and can return result to emit.
  this.result = 18;
});

//return the result is 18.
var result = emitter.emit('test', arg1, arg2/*…args*/); // Two above listeners invoked
emitter.emit('test', arg1, arg2/*…args*/); // Only first listener invoked

emitter.off('test', listener);              // Removed first listener
emitter.emit('test', arg1, arg2/*…args*/); // No listeners invoked
```
### Additional utilities

#### allOff(obj) _(event-emitter/all-off)_

Removes all listeners from given event emitter object

#### hasListeners(obj[, name]) _(event-emitter/has-listeners)_

Whether object has some listeners attached to the object.
When `name` is provided, it checks listeners for specific event name

```javascript
var emitter = ee();
var hasListeners = require('event-emitter/has-listeners');
var listener = function () {};

hasListeners(emitter); // false

emitter.on('foo', listener);
hasListeners(emitter); // true
hasListeners(emitter, 'foo'); // true
hasListeners(emitter, 'bar'); // false

emitter.off('foo', listener);
hasListeners(emitter, 'foo'); // false
```

#### pipe(source, target[, emitMethodName]) _(event-emitter/pipe)_

Pipes all events from _source_ emitter onto _target_ emitter (all events from _source_ emitter will be emitted also on _target_ emitter, but not other way).  
Returns _pipe_ object which exposes `pipe.close` function. Invoke it to close configured _pipe_.  
It works internally by redefinition of `emit` method, if in your interface this method is referenced differently, provide its name (or symbol) with third argument.

#### unify(emitter1, emitter2) _(event-emitter/unify)_

Unifies event handling for two objects. Events emitted on _emitter1_ would be also emitter on _emitter2_, and other way back.  
Non reversible.

```javascript
var eeUnify = require('event-emitter/unify');

var emitter1 = ee(), listener1, listener3;
var emitter2 = ee(), listener2, listener4;

emitter1.on('test', listener1 = function () { });
emitter2.on('test', listener2 = function () { });

emitter1.emit('test'); // Invoked listener1
emitter2.emit('test'); // Invoked listener2

var unify = eeUnify(emitter1, emitter2);

emitter1.emit('test'); // Invoked listener1 and listener2
emitter2.emit('test'); // Invoked listener1 and listener2

emitter1.on('test', listener3 = function () { });
emitter2.on('test', listener4 = function () { });

emitter1.emit('test'); // Invoked listener1, listener2, listener3 and listener4
emitter2.emit('test'); // Invoked listener1, listener2, listener3 and listener4
```


