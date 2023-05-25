import Eventable from './eventable'

const removeAllListeners = Eventable().methods.removeAllListeners;

export function allOff(emitter/* , type */) {
	const type = arguments[1];
  return removeAllListeners.call(emitter, type);
};

export default allOff;
