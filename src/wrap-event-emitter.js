import {defineProperty} from 'util-ex'
import eventable from './eventable'

const create = Object.create;
const defineProperties = Object.defineProperties;

export const methods = eventable().methods;

const descriptors = {
  on: {
    value: methods.on
  },
  once: {
    value: methods.once
  },
  off: {
    value: methods.off
  },
  emit: {
    value: methods.emit
  },
  emitAsync: {
    value: methods.emitAsync
  },
};

const base = defineProperties({}, descriptors);

/**
 * Create or inject the eventable instance into the object
 * @param {Object} [o] the optional instance to eventable
 * @returns o or new Event instance
 */
export function wrapEventEmitter(o) {
  const result = o == null ? create(base) : defineProperties(Object(o), descriptors)
  defineProperty(result, '_events', {})
  return result
};


export default wrapEventEmitter
