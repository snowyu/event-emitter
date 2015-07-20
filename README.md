### events-ex [![Build Status](https://img.shields.io/travis/snowyu/events-ex.js/master.png)](http://travis-ci.org/snowyu/events-ex.js) [![npm](https://img.shields.io/npm/v/events-ex.svg)](https://npmjs.org/package/events-ex) [![downloads](https://img.shields.io/npm/dm/events-ex.svg)](https://npmjs.org/package/events-ex) [![license](https://img.shields.io/npm/l/events-ex.svg)](https://npmjs.org/package/events-ex)


Browser-friendly enhanced events most compatible with standard node.js and coffee-script. It's modified from [event-emitter](https://github.com/medikoo/event-emitter) mainly. It can add event-able to your class directly.


### Features

* rewrite the core architecture
* keep most compatible with [node events](nodejs.org/api/events.html) and [event-emitter](https://github.com/medikoo/event-emitter)
+ more powerful event-able ability
* hookable event system

### Differences

* Difference with [node events](nodejs.org/api/events.html)
  - domain is not supported yet(TODO)
  + **`broken change`**: The event object bubbling Supports
    + the event object as listener's "this" object.
    + return the result property of event object to emitter.
    + prevent the rest of listener from be excuted if set the stopped property of event object to true
    * **`broken change`**: the `emit` return the result of listeners's callback function instead of the successful state.
    * **`broken change`**: the `this` object of listeners' callback function is the `Event` Object instead of the emitter object.
      * the emitter object is put into the `target` property of the `Event` Object.
* Difference with [event-emitter](https://github.com/medikoo/event-emitter)
  + **`broken change`**: The event object bubbling Supports(see above)
  + add the defaultMaxListeners class property to keep compatible with node events.
  + add the setMaxListeners method to keep compatible with node events.
  + add `error`, `newListener` and `removeListener` events to keep compatible with node events.
  + add listeners() method to keep compatible with node events.
  + add listenerCount() class method to keep compatible with node events.


### Installation

	$ npm install events-ex

To port it to Browser or any other (non CJS) environment, use your favorite CJS bundler. No favorite yet? Try: [Browserify](http://browserify.org/), [Webmake](https://github.com/medikoo/modules-webmake) or [Webpack](http://webpack.github.io/)

### Usage


Add the event-able feature to your class directly:

```coffee

eventable = require('events-ex/eventable')

class MyClass
  # advanced usage see API topic.
  eventable MyClass

my = new MyClass

my.on 'event', ->
  console.log 'event occur'

my.emit 'event'

```

the following is javascript:

```js
var eventable = require('events-ex/eventable');

function MyClass() {}

eventable(MyClass);

var my = new MyClass;

my.on('event', function() {
  console.log('event occur');
});

my.emit('event');
```

Node JS events Usage:

```coffee
EventEmitter = require('events-ex')
inherits     = require('inherits-ex')

class MyDb
  inherits MyDb, EventEmitter
  get: (key)->
    # Demo the event object bubbling usage:
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
### API

#### eventable(class[, options]) _(events-ex/eventable)_

Add the event-able ability to the class directly.

* `class`: the class to be injected the ability.
* `options` *(object)*: optional options
  * `include` *(array|string)*: only these emitter methods will be added to the class
  * `exclude` *(array|string)*: theses emitter methods would not be added to the class
  * `methods` *(object)*: hooked methods to the class
    * key: the method name to hook.
    * value: the new method function
      * use `this.super()` to call the original method.
      * `this.self` is the original `this` object.
  * `classMethods` *(object)*: hooked class methods to the class

```coffee
  eventable  = require('events-ex/eventable')
  #OtherClass = require('OtherClass')
  class OtherClass
    exec: -> console.log "my original exec"

  class MyClass
    # only 'on', 'off', 'emit' added to the class
    eventable MyClass, include: ['on', 'off', 'emit']

  # add the eventable ability to OtherClass and inject the exec method of OtherClass.
  eventable OtherClass, methods:
    exec: ->
      console.log "new exec"
      @super() # call the original method
```
#### allOff(obj) _(events-ex/all-off)_

**keep compatible only**: the `removeAllListeners` has already been buildin.

Removes all listeners from given event emitter object

#### hasListeners(obj[, name]) _(events-ex/has-listeners)_

Whether object has some listeners attached to the object.
When `name` is provided, it checks listeners for specific event name

```javascript
var emitter = ee();
var hasListeners = require('events-ex/has-listeners');
var listener = function () {};

hasListeners(emitter); // false

emitter.on('foo', listener);
hasListeners(emitter); // true
hasListeners(emitter, 'foo'); // true
hasListeners(emitter, 'bar'); // false

emitter.off('foo', listener);
hasListeners(emitter, 'foo'); // false
```

#### pipe(source, target[, emitMethodName]) _(events-ex/pipe)_

Pipes all events from _source_ emitter onto _target_ emitter (all events from _source_ emitter will be emitted also on _target_ emitter, but not other way).
Returns _pipe_ object which exposes `pipe.close` function. Invoke it to close configured _pipe_.
It works internally by redefinition of `emit` method, if in your interface this method is referenced differently, provide its name (or symbol) with third argument.

#### unify(emitter1, emitter2) _(events-ex/unify)_

Unifies event handling for two objects. Events emitted on _emitter1_ would be also emitter on _emitter2_, and other way back.
Non reversible.

```javascript
var eeUnify = require('events-ex/unify');

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


