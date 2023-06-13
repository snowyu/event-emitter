import eventable from './eventable'

const removeAllListeners = eventable().methods.removeAllListeners;

/**
 * Removes all listeners for a specific event or all events from an event emitter.
 *
 * @param {import('./event-emitter').EventEmitter} emitter - The event emitter to remove listeners from.
 * @param {string} [type] - The event to remove listeners for. If not provided, all listeners for all events will be removed.
 * @returns {import('./event-emitter').EventEmitter} - The event emitter with all listeners removed.
 */
export function allOff(emitter, type) {
  return removeAllListeners.call(emitter, type);
};

export default allOff;
