"use strict"

Eventable = require('./eventable')

methods           = Eventable().methods
create            = Object.create
defineProperties  = Object.defineProperties

descriptors =
  on:
    value: methods.on
  once:
    value: methods.once
  off:
    value: methods.off
  emit:
    value: methods.emit

base = defineProperties {}, descriptors

exports = module.exports = (o)->
  if not o? then create(base) else defineProperties(Object(o), descriptors)

exports.methods = methods
