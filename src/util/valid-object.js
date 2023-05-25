import {isObject} from 'util-ex'

export function validObject(value) {
	if (!isObject(value)) {throw new TypeError(value + " is not an Object")}
	return value
}

export default validObject
