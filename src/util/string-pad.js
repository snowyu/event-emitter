import toInteger from "./to-int"
import value from "./valid-object"

const repeat 		= String.prototype.repeat
const abs       = Math.abs
const max       = Math.max

export function pad(fill /* , length */) {
	const self = String(value(this))
  const sLength = self.length
  let length = arguments[1]

	length = isNaN(length) ? 1 : toInteger(length)
	fill = repeat.call(String(fill), abs(length))
	if (length >= 0) {return fill.slice(0, max(0, length - sLength)) + self}
	return self + (sLength + length >= 0 ? "" : fill.slice(length + sLength))
}

export default pad
