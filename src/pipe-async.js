import defineProperty from 'util-ex/lib/defineProperty'

import {methods} from './event-emitter'
import arrRemove from './util/array-remove'
import validObject from './util/valid-object'

const hasOwnProperty = Object.prototype.hasOwnProperty
const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
const arrFrom        = Array.from
const emit           = methods.emitAsync

export function pipe(e1, e2/* , name */) {
	let pipes

	(validObject(e1) && validObject(e2))
	let name = arguments[2]
	if (name === undefined) {name = 'emitAsync'}

	const result = {
		close() { arrRemove.call(pipes, e2) }
	};
	if (hasOwnProperty.call(e1, '__eePipes__')) {
		(pipes = e1.__eePipes__).push(e2)
		return result
	}
	defineProperty(e1, '__eePipes__', pipes = [e2])
	let desc = getOwnPropertyDescriptor(e1, name)
	if (!desc) {
		desc = {}
	} else {
		delete desc.get
		delete desc.set
	}
	desc.value = async function () {
		const data = arrFrom(pipes)
		await emit.apply(this, arguments)
		let emitter
		for (let i = 0; (emitter = data[i]); ++i) await emit.apply(emitter, arguments)
	}
	defineProperty(e1, name, desc.value, desc)
	return result
};

export default pipe
