'use strict'
customAbility   = require 'custom-ability'
isFunction      = require 'util-ex/lib/is/type/function'
isObject        = require 'util-ex/lib/is/type/object'
isNumber        = require 'util-ex/lib/is/type/number'
isUndefined     = require 'util-ex/lib/is/type/undefined'
isArray         = require 'util-ex/lib/is/type/array'
defineProperty  = require 'util-ex/lib/defineProperty'
hasOwnProperty  = Object::hasOwnProperty
create          = Object.create

getEventableMethods = (aClass)->
      on: (type, listener) ->
        throw TypeError listener + ' is not a function' if not isFunction listener
        if not @hasOwnProperty('_events')
          data = create(null)
          defineProperty this, '_events', data
        else
          data = @_events
        #To avoid recursion in the case that type === 'newListener'! Before
        # adding it to the listeners, first emit 'newListener'.
        if data.newListener
          @emit 'newListener', type, if isFunction(listener.listener) then listener.listener else listener
        unless data[type]
          data[type] = listener
        else if isObject data[type]
          data[type].push listener
        else
          data[type] = [data[type], listener]
        #Check for listener leak
        if isObject(data[type]) and not data[type].warned
          if not isUndefined @_maxListeners
            m = @_maxListeners
          else
            m = aClass.defaultMaxListeners
          if m and m > 0 and data[type].length > m
            data[type].warned = true
            console.error '(node) warning: possible EventEmitter memory ' +
              'leak detected. %d %s listeners added. ' +
              'Use emitter.setMaxListeners() to increase limit.',
              data[type].length, type
            console.trace()
        this

      once: (type, listener) ->
        throw TypeError listener + ' is not a function' if not isFunction listener
        fired = false
        self = @

        once = ->
          self.off type, once
          if not fired
            fired = true
            listener.apply this, arguments
        once.listener = listener
        @on type, once
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
        if not listeners and type is 'error'
          er = arguments[1]
          if @domain
            er = new Error("Uncaught, unspecified 'error' event.") unless er
            er.domainEmitter = @
            er.domain = @domain
            er.domainThrown = false
            @domain.emit('error', er)
          else if er instanceof Error
            throw er
          else
            throw Error("Uncaught, unspecified 'error' event.")
          return
        return unless listeners
        @domain.enter() if @domain and this isnt process
        evt = Event(this)
        if not isObject listeners
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
              i = 0
              while ++i < l
                args[i - 1] = arguments[i]
              listeners.apply evt, args
        else
          l = arguments.length
          args = new Array(l - 1)
          i = 0
          while ++i < l
            args[i - 1] = arguments[i]
          listeners = listeners.slice()
          i = 0
          while (listener = listeners[i])
            listener.apply evt, args
            break if evt.stopped
            ++i
        @domain.exit() if @domain and this isnt process
        evt.end()
      setMaxListeners: (n)->
        throw TypeError('n must be a positive number') if not isNumber(n) or n < 0 or isNaN(n)
        if not @hasOwnProperty('_maxListeners')
          defineProperty this, '_maxListeners', n
        else
          @_maxListeners = n
        @
      listeners: (type)->
        data = @_events
        if not (data and data[type])
          result = []
        else if isFunction data[type]
          result = [data[type]]
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
      off: (type, listener) ->
        throw TypeError listener + ' is not a function' if not isFunction listener
        return this unless @hasOwnProperty('_events')
        data = @_events
        return this unless data[type]
        listeners = data[type]
        if (listeners is listener) or (listeners.listener is listener)
          delete data[type]
          @emit 'removeListener', type, listener if data.removeListener
        else if isObject listeners
          i = listeners.length
          while (--i >= 0)
            candidate = listeners[i]
            break if (candidate is listener) or (candidate.listener is listener)
          return @ if i < 0
          if listeners.length == 1
            listeners.length = 0
            delete data[type]
          else if listeners.length == 2
            data[type] = listeners[(if i then 0 else 1)]
            listeners.length = 1
          else
            listeners.splice i, 1
          @emit 'removeListener', type, listener if data.removeListener
        this
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
          while listeners.length and data[type]
            @removeListener type, listeners[listeners.length-1]
        delete data[type]
        return this

module.exports = getEventableMethods

