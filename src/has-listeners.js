
import {isEmptyObject} from 'util-ex'

const hasOwnProperty = Object.prototype.hasOwnProperty;

function isValue(v) {
	return v!== null && v!== undefined
}

export function hasListeners(obj/*, type*/) {
	if (!isValue(obj)) {throw new TypeError("Cannot use null or undefined")}

	const type = arguments[1];
	if (arguments.length > 1) {
		return hasOwnProperty.call(obj, '_events') && Boolean(obj._events[type]);
	}
	return obj.hasOwnProperty('_events') && !isEmptyObject(obj._events);
};

export default hasListeners
