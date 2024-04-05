import {defineProperty, isArray, isFunction, isNumber, isObject, isRegExp as _isRegExp, isUndefined, isRegExpStr, toRegExp } from 'util-ex'
import {RegExpEventSymbol} from './consts'
import {Event} from './event';

const create          = Object.create
const UnCAUGHT_ERR    = "Uncaught, unspecified 'error' event."
const slice           = Array.prototype.slice

function isRegExp(value) {
  const result = isRegExpStr(value)
  return result || _isRegExp(value)
}

export function getEventableMethods(aClass) {
  return {
    /**
     * Adds a listener function to the specified event type.
     * @param {string|RegExp} type - The event type to listen for.
     * @param {Function} listener - The listener function to be called when the event is emitted.
     * @returns {import('./event-emitter').EventEmitter} The EventEmitter instance to allow chaining.
     * @throws {TypeError} If the listener is not a function.
     */
    on(type, listener) {
      if (!isFunction(listener)) {throw new TypeError(listener + ' is not a function')}
      let data
      if (!this.hasOwnProperty('_events')) {
        data = create(null)
        defineProperty(this, '_events', data)
      } else {
        data = this._events
      }
      // To avoid recursion in the case that type === 'newListener'! Before
      // adding it to the listeners, first emit 'newListener'.
      if (data.newListener) {
        this.emit('newListener', type, isFunction(listener.listener)? listener.listener:listener)
      }
      if (isRegExp(type)) {
        data = data[RegExpEventSymbol] || (data[RegExpEventSymbol] = create(null))
      }
      if  (!data[type]) {
        data[type] = listener
      } else if (isObject(data[type])) {
        data[type].push(listener)
      } else {
        data[type] = [data[type], listener]
      }
      // Check for listener leak
      if (isObject(data[type]) && !data[type].warned) {
        let m
        if (!isUndefined(this._maxListeners))
          m = this._maxListeners
        else {
          m = aClass.defaultMaxListeners
        }
        if (m && m > 0 && data[type].length > m) {
          data[type].warned = true
          console.error('(node) warning: possible EventEmitter memory ' +
            'leak detected. %d %s listeners added. ' +
            'Use emitter.setMaxListeners() to increase limit.',
            data[type].length, type)
          // eslint-disable-next-line no-console
          console.trace()
        }
      }
      return this
    },

    /**
     * Adds a one-time listener function to the specified event type.
     * @param {string|RegExp} type - The event type to listen for.
     * @param {Function} listener - The listener function to be called once when the event is emitted.
     * @returns {import('./event-emitter').EventEmitter} The EventEmitter instance to allow chaining.
     * @throws {TypeError} If the listener is not a function.
     */
    once(type, listener) {
      if (!isFunction(listener)) {throw new TypeError(listener + ' is not a function' )}
      let fired = false
      const self = this

      async function _once() {
        self.off(type, _once)
        if (!fired) {
          fired = true
          await listener.apply(this, arguments)
        }
      }
      _once.listener = listener
      this.on(type, _once)
      return this
    },


    /**
     * Emits the specified event type with the given arguments.
     * @param {...*} args - The event type followed by any number of arguments to be passed to the listener functions.
     * @returns {*} The result of the event.
     */
    emit(/* type, msg , ... */) {
      const r = _emit.apply(this, arguments)
      if (!r) {return}
      const args = r.args
      const listeners = r.listeners
      const evt = Event(this, r.type)
      const errs = []
      try {
        let i = 0
        let listener
        while (listener = listeners[i]){
          try {
            _notify(listener, evt, args)
            if (evt.stopped) {break}
          } catch(err) {
            errs.push({err: err, listener: listener})
          }
          ++i
        }
        if (errs.length) {
          for (let i=0;i<errs.length;i++) {
            const it = errs[i]
            this.emit('error', it.err, 'notify', r.type, it.listener, args)
          }
        }
      } finally {
        // eslint-disable-next-line no-unsafe-finally
        return evt.end()
      }
    },

    /**
     * Asynchronously emits the specified event type with the given arguments.
     * @param {...*} args - The event type followed by any number of arguments to be passed to the listener functions.
     * @returns {Promise<*>} A promise that resolves with the result of the event.
     */
    async emitAsync(/* type, msg , ... */) {
      const r = _emit.apply(this, arguments)
      if (!r) {return}
      const args = r.args
      const listeners = r.listeners
      const evt = Event(this, r.type)
      const errs = []
      try {
        for (const listener of listeners) {
          try {
            await _notify(listener, evt, args);
            if (evt.stopped) {break}
          } catch(err) {
            errs.push({err: err, listener: listener})
          }
        }
        if (errs.length) {
          for (let i=0;i<errs.length;i++) {
            const it = errs[i]
            this.emit('error', it.err, 'notify', r.type, it.listener, args)
          }
        }
      } finally {
        // eslint-disable-next-line no-unsafe-finally
        return evt.end()
      }
    },

    setMaxListeners(n) {
      if (!isNumber(n) || n < 0 || isNaN(n)) {throw new TypeError('n must be a positive number')}
      if (!this.hasOwnProperty('_maxListeners')) {
        defineProperty(this, '_maxListeners', n)
      } else {
        this._maxListeners = n
      }
      return this
    },

    listeners(type) {
      let data = this._events
      let result = []
      if (data) {
        if (isRegExp(type) && data[RegExpEventSymbol]) {
          data = data[RegExpEventSymbol]
        }
        const listener = data[type]
        if (listener) {
          if (isFunction(listener)) {
            result = [listener]
          } else {
            result = listener.slice()
          }
        }
      }
      return result
    },

    listenerCount(emitter, type) {
      if (typeof emitter === 'string' || _isRegExp(emitter))
        type = emitter
        emitter = this
      let data = emitter._events
      let result = 0
      if (data) {
        if (isRegExp(type) && data[RegExpEventSymbol]) {
          data = data[RegExpEventSymbol]
        }
        const listener = data[type]
        if (listener) {
          if (isFunction(listener)) {
            result = 1
          } else {
            result = listener.length
          }
        }
      }
      return result
    },

    /**
     * Removes a listener function from the specified event type.
     * @param {string|RegExp} type - The event type to remove the listener from.
     * @param {Function} listener - The listener function to be removed.
     * @returns {import('./event-emitter').EventEmitter} The EventEmitter instance to allow chaining.
     * @throws {TypeError} If the listener is not a function.
     */
    off(type, listener) {
      if (!isFunction(listener)) {throw new TypeError(listener + ' is not a function')}
      if (!this.hasOwnProperty('_events')) {return this}
      let data = this._events
      const  hasRemover = data.removeListener
      if (isRegExp(type) && data[RegExpEventSymbol]) {
        data = data[RegExpEventSymbol]
      }
      if (!data[type]) {return this}
      const listeners = data[type]
      if ((listeners === listener) || (listeners.listener === listener)) {
        delete data[type]
        if (hasRemover) {this.emit('removeListener', type, listener)}
      } else if (isObject(listeners)) {
        let i = listeners.length
        while (--i >= 0) {
          const candidate = listeners[i]
          if (candidate === listener || candidate.listener === listener) {break}
        }
        if (i < 0) {return this}
        if (listeners.length === 1) {
          listeners.length = 0
          delete data[type]
        } else if (listeners.length === 2) {
          data[type] = listeners[(i ? 0 : 1)]
          listeners.length = 1
        } else {
          listeners.splice(i, 1)
        }
        if (hasRemover) {this.emit('removeListener', type, listener)}
      }
      return this
    },

    /**
     * Removes all listener functions from the specified event type.
     * @param {string|RegExp} type - The event type to remove the listener from.
     * @returns {import('./event-emitter').EventEmitter} The EventEmitter instance to allow chaining.
     * @throws {TypeError} If the listener is not a function.
     */
    removeAllListeners(type) {
      if (!this.hasOwnProperty('_events')) {return this}
      let data = this._events
      const regExpEvents = data[RegExpEventSymbol]
      // not listening for removeListener, no need to emit
      if (!data.removeListener) {
        if (type == null){
          // delete this._events
          Object.keys(data).forEach(key => delete data[key])
          if (regExpEvents) {delete data[RegExpEventSymbol]}
        } else {
          if (isRegExp(type) && regExpEvents) {
            data = regExpEvents
          }
          delete data[type]
        }
        return this
      }
      // emit removeListener for all listeners on all events
      if (type == null) {
        for (const key in data) {
          if (key === 'removeListener' || key === RegExpEventSymbol) {continue}
          this.removeAllListeners(key)
        }
        if (regExpEvents) {
          for (const key in regExpEvents) {
            this.removeAllListeners(toRegExp(key))
          }
        }
        this.removeAllListeners('removeListener')
        // delete this._events
        // Object.keys(data).forEach(key => delete data[key])
        if (regExpEvents) {delete data[RegExpEventSymbol]}
        return this
      }
      if ( isRegExp(type) && regExpEvents) {
        data = regExpEvents
      }
      const listeners = data[type]
      if (isFunction(listeners)){
        this.off(type, listeners)
      } else if (isArray(listeners)) {
        // LIFO order
        while (listeners.length && data[type]) {
          this.off(type, listeners[listeners.length-1])
        }
      }
      delete data[type]
      return this
    }
  }
}

export default getEventableMethods

function _emit(type, msg) {
  const data = this._events
  let listeners
  if (data) {listeners = data[type]}
  const args = slice.call(arguments, 1)
  if (type === 'error' && !msg) {
    msg = new Error(UnCAUGHT_ERR)
    if (args.length > 0) {
      args[0] = msg
    } else {
      args.push(msg)
    }
  }
  // If there is no 'error' event listener then throw.
  if (!listeners && type === 'error') {
    if (!(msg instanceof Error)) {msg = new Error(msg ? UnCAUGHT_ERR + msg : UnCAUGHT_ERR)}
    throw msg
  }
  const regExpEvents = data && data[RegExpEventSymbol]
  if (regExpEvents) {
    const matched = []
    for (let key in regExpEvents) {
      key = toRegExp(key)
      if (key && key.test(type)) {
        const listener = regExpEvents[key]
        if (isArray(listener)) {
          matched.push.apply(matched, listener)
        } else {
          matched.push(listener)
        }
      }
    }
    if (matched.length) {
      listeners = listeners ? !isObject(listeners) ? [listeners].concat(matched) : listeners.concat(matched) : matched
    }
  }
  if (!listeners) {return}
  if (!isObject(listeners)) {
    listeners = [listeners]
  } else {
    listeners = listeners.slice()
  }
  return {type, args, listeners}
}

function _notify(listener, evt, args) {
  let result
  switch (args.length) {
    case 0:
      result = listener.call(evt)
      break
    case 1:
      result = listener.call(evt, args[0])
      break
    case 2:
      result = listener.call(evt, args[0], args[1])
      break
    default: {
      result = listener.apply(evt, args)
    }
  }
  return result
}
