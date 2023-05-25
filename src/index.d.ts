export * from './consts'
export * from './all-off'
export * from './eventable'
export * from './event-emitter'
export * from './has-listeners'
export * from './pipe'
export * from './pipe-async'
export * from './unify'

type ListenerCallbackFunc = Function;

/**
 * Class that represents an event emitter.
 */
export class EventEmitter {
  static defaultMaxListeners: number;

  /**
   * Adds a listener function to the specified event type.
   * @param {string} type - The event type to listen for.
   * @param {Function} listener - The listener function to be called when the event is emitted.
   * @returns {EventEmitter} The EventEmitter instance to allow chaining.
   * @throws {TypeError} If the listener is not a function.
   */
  on(eventName: string, listener: ListenerCallbackFunc): EventEmitter;
  /**
   * Adds a one-time listener function to the specified event type.
   * @param {string} type - The event type to listen for.
   * @param {Function} listener - The listener function to be called once when the event is emitted.
   * @returns {EventEmitter} The EventEmitter instance to allow chaining.
   * @throws {TypeError} If the listener is not a function.
   */
  once(eventName: string, listener: ListenerCallbackFunc): EventEmitter;
  /**
   * Removes a listener function from the specified event type.
   * @param {string} type - The event type to remove the listener from.
   * @param {Function} listener - The listener function to be removed.
   * @returns {EventEmitter} The EventEmitter instance to allow chaining.
   * @throws {TypeError} If the listener is not a function.
   */
  off(eventName: string, listener: ListenerCallbackFunc): EventEmitter;
  /**
   * Emits the specified event type with the given arguments.
   * @param {...*} args - The event type followed by any number of arguments to be passed to the listener functions.
   * @returns {*} The result of the event.
   */
  emit(eventName: string, ...args: any[]): any;
  /**
   * Asynchronously emits the specified event type with the given arguments.
   * @param {...*} args - The event type followed by any number of arguments to be passed to the listener functions.
   * @returns {Promise<*>} A promise that resolves with the result of the event.
   */
  emitAsync(eventName: string, ...args: any[]): Promise<any>;
  /**
   * Removes all listeners for a specific event or all events from an event emitter.
   *
   * @param {string} [eventName] - The event to remove listeners for. If not provided, all listeners for all events will be removed.
   * @returns {EventEmitter} - The event emitter with all listeners removed.
   */
  removeAllListeners(eventName?: string): EventEmitter;
  setMaxListeners(n: number): EventEmitter;
  /**
   * Returns an array of functions that are registered to listen for the specified event.
   *
   * @param {string} eventName - The name of the event to get the listeners for.
   * @returns {ListenerCallbackFunc[]} - An array of functions that are registered to listen for the specified event.
   */
  listeners(eventName: string): ListenerCallbackFunc[];
  /**
   * Returns the count of listeners that are registered to listen for the specified event.
   *
   * @param {string} eventName - The name of the event to get the listeners for.
   * @returns {number} - the listeners count
   */
  listenerCount(eventName: string): number;
  static listenerCount(emitter: EventEmitter, eventName: string): number; // Deprecated
}

export default EventEmitter;
