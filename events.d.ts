type ListenerCallbackFunc = Function;

/**
 * `this` is the bubbling event object in listtener callback.
 */
export interface Event {
  /*
   * internal used.
   */
  // eventCache: Event[];

  /**
   * who trigger the event
   */
  target: EventEmitter;
  /**
   * pass stopped true to stop bubbling event.
   */
  stopped: boolean;
  /**
   * keep your result here if any.
   */
  result: any;

  new(target: EventEmitter);
  // init(target: EventEmitter);
  // setCache(cache: Event[]): Event[];
  /* internal used */
  // end(): any;
  /* internal used */
  // pop(): Event;
}

export class EventEmitter {
  // Event: Event;
  static defaultMaxListeners: number;

  on(eventName: string, listener: ListenerCallbackFunc): EventEmitter;
  once(eventName: string, listener: ListenerCallbackFunc): EventEmitter;
  off(eventName: string, listener: ListenerCallbackFunc): EventEmitter;
  emit(eventName: string, ...args: any[]);
  removeAllListeners(eventName?: string): EventEmitter;
  setCache(cache: Event[]): Event[];
  setMaxListeners(n: number): EventEmitter;
  listeners(eventName: string): ListenerCallbackFunc[];
  listenerCount(eventName: string): number;
  static listenerCount(emitter: EventEmitter, eventName: string): number; // Deprecated
}

export default EventEmitter;
