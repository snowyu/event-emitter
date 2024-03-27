import {defineProperty} from 'util-ex'
import {eventable} from './eventable'

/**
 * @class
 * @classdesc Class that represents an event emitter.
 */
export function EventEmitter() {defineProperty(this, '_events', {})}

eventable(EventEmitter);

export default EventEmitter;
