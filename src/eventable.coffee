"use strict"
isFunction  = require("util-ex/lib/is/type/function")
isObject    = require("util-ex/lib/is/type/object")
isNumber    = require("util-ex/lib/is/type/number")
isUndefined = require("util-ex/lib/is/type/undefined")
isArray     = require("util-ex/lib/is/type/array")
extend      = require("util-ex/lib/_extend")
defineProperty = require("util-ex/lib/defineProperty")
hasOwnProperty = Object::hasOwnProperty
create = Object.create

module.exports = class Eventable
  constructor: (aClass)->
    throw TypeError "Eventable a class only" if this instanceof Eventable
    if not aClass.hasOwnProperty('defaultMaxListeners')
      extend aClass, Eventable
      extend aClass::, Eventable::
    aClass
  defineProperty @, 'methods', methods = 
    on: on_ = (type, listener) ->
      throw TypeError listener + " is not a function" if not isFunction listener
      if not @hasOwnProperty("_events")
        data = create(null)
        defineProperty this, "_events", data
        defineProperty this, "_maxListeners", Eventable.defaultMaxListeners
      else
        data = @_events
      #To avoid recursion in the case that type === "newListener"! Before
      # adding it to the listeners, first emit "newListener".
      if data.newListener
        @emit 'newListener', type, if isFunction(listener.listener) then listener.listener else listener
      unless data[type]
        data[type] = listener
      else if isObject data[type]
        data[type].push listener
      else
        data[type] = [data[type], listener]
      #Check for listener leak
      if isObject(data[type] and not data[type].warned)
        if not isUndefined @_maxListeners
          m = @_maxListeners
        if m and m > 0 and data[type].length > m
          data[type].warned = true
          console.error '(node) warning: possible EventEmitter memory ' +
            'leak detected. %d %s listeners added. ' +
            'Use emitter.setMaxListeners() to increase limit.',
            data[type].length, type
          console.trace()
      this

    once: (type, listener) ->
      throw TypeError listener + " is not a function" if not isFunction listener
      fired = false
      self = @
      
      on_.call @, type, once = ->
        off_.call self, type, once
        if not fired
          fired = true
          listener.apply this, arguments

      once.listener = listener
      this

    off: off_ = (type, listener) ->
      throw TypeError listener + " is not a function" if not isFunction listener
      return this unless @hasOwnProperty("_events")
      data = @_events
      return this unless data[type]
      listeners = data[type]
      if isObject listeners
        i = 0
        while (candidate = listeners[i])
          if (candidate is listener) or (candidate.listener is listener)
            if listeners.length is 2
              data[type] = listeners[(if i then 0 else 1)]
            else
              listeners.splice i, 1
            @emit "removeListener", type, listener if data.removeListener
          ++i
      else if (listeners is listener) or (listeners.listener is listener)
        delete data[type] 
        @emit "removeListener", type, listener if data.removeListener
      this

    Event:  class Event
      eventCache = []
      constructor: (target) ->
        unless this instanceof Event
          evt = eventCache.pop()
          unless evt
            evt = new Event(target)
          else
            evt.init target
          return evt
        @init target
      init: (target) ->
        @target = target
        @stopped = false
        @result = undefined

      @setCache = (cache) ->
        eventCache = cache

      end:->
        eventCache.push this
        @result

      pop: ->
        eventCache.pop()
    setCache: Event.setCache

    emit: (type) ->
      data = @_events
      listeners = data[type] if data
      #If there is no 'error' event listener then throw.
      if type is 'error' and not (data and listeners)
        er = arguments[1]
        if @domain
          er = new Error('Uncaught, unspecified "error" event.') unless er
          er.domainEmitter = @
          er.domain = @domain
          er.domainThrown = false
          @domain.emit('error', er)
        else if er instanceof Error
          throw er
        else
          throw Error('Uncaught, unspecified "error" event.')
        return
      return unless listeners
      @domain.enter() if @domain and this isnt process
      evt = Event(this)
      if isObject listeners
        l = arguments.length
        args = new Array(l - 1)
        i = 1
        while i < l
          args[i - 1] = arguments[i]
          ++i
        listeners = listeners.slice()
        i = 0
        while (listener = listeners[i])
          listener.apply evt, args
          break if evt.stopped
          ++i
      else
        switch arguments.length
          when 1
            listeners.call evt
          when 2
            listeners.call evt, arguments[1]
          when 3
            listeners.call evt, arguments[1], arguments[2]
          else
            l = arguments.length
            args = new Array(l - 1)
            i = 1
            while i < l
              args[i - 1] = arguments[i]
              ++i
            listeners.apply evt, args
      @domain.exit() if @domain and this isnt process
      evt.end()
    setMaxListeners: (n)->
      throw TypeError('n must be a positive number') if not isNumber(n) or n < 0 or isNaN(n)
      @_maxListeners = n
      @
    listeners: (type)->
      data = @_events
      if not (data and data[type])
        result = []
      else if isFunction data[type]
        reuslt = [data[type]]
      else
        result = data[type].slice()
      result
    listenerCount: (emitter, type)->
      data = emitter._events
      if not (data and data[type])
        result = 0
      else if isFunction data[type]
        reuslt = 1
      else
        result = data[type].length
      result
    removeAllListeners: (type)->
      return this unless @hasOwnProperty('_events')
      data = @_events
      #not listening for removeListener, no need to emit
      if not data.removeListener
        if not type?
          delete @_events
        else
          delete data[type]
        return this
      #emit removeListener for all listeners on all events
      if not type?
        for key of data
          continue if key is 'removeListener'
          @removeAllListeners key
        @removeAllListeners 'removeListener'
        delete @_events
        return this
      listeners = data[type]
      if isFunction listeners
        @removeListener type, listeners
      else if isArray listeners
        #LIFO order
        while listeners.length
          @removeListener type, listeners[listeners.length-1]
      delete data[type]
      return this
  #By default EventEmitters will print a warning if more than 10 listeners are
  #added to it. This is a useful default which helps finding memory leaks.
  @defaultMaxListeners: 10
  @listenerCount: methods.listenerCount
  on: methods.on
  addListener: methods.on
  off: methods.off
  removeListener:methods.off
  removeAllListeners: methods.removeAllListeners
  once: methods.once
  setMaxListeners: methods.setMaxListeners
  listeners: methods.listeners


