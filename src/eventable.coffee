'use strict'
customAbility   = require 'custom-ability'
isFunction      = require 'util-ex/lib/is/type/function'
isObject        = require 'util-ex/lib/is/type/object'
isNumber        = require 'util-ex/lib/is/type/number'
isUndefined     = require 'util-ex/lib/is/type/undefined'
isArray         = require 'util-ex/lib/is/type/array'
defineProperty  = require 'util-ex/lib/defineProperty'
defaultMethods  = require './default-methods'
hasOwnProperty  = Object::hasOwnProperty
create          = Object.create

getEventableClass = (aClass, aOptions)->
  class Eventable
    aClass = Eventable unless aClass?
    defineProperty @, 'methods', methods = defaultMethods(aClass)
    #By default EventEmitters will print a warning if more than 10 listeners are
    #added to it. This is a useful default which helps finding memory leaks.
    @defaultMaxListeners: 10
    @listenerCount: methods.listenerCount
    emit: methods.emit
    on: methods.on
    addListener: methods.on
    off: methods.off
    removeListener:methods.off
    removeAllListeners: methods.removeAllListeners
    once: methods.once
    setMaxListeners: methods.setMaxListeners
    listeners: methods.listeners
  #End Class Eventable

module.exports = customAbility getEventableClass, true

