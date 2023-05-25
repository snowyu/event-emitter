import eventable from './eventable'

export * from './all-off'
export * from './consts'
export * from './event'
export * from './eventable'
export * from './event-emitter'
export * from './has-listeners'
export * from './pipe'
export * from './pipe-async'
export * from './unify'

/**
 * @class
 * @classdesc Class that represents an event emitter.
 */
export function EventEmitter() {}

eventable(EventEmitter);

export default EventEmitter;
