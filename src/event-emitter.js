import {eventable} from './eventable'

/**
 * @class
 * @classdesc Class that represents an event emitter.
 */
export function EventEmitter() {}

eventable(EventEmitter);

export default EventEmitter;
