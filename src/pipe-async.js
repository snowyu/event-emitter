import defineProperty from 'util-ex/lib/defineProperty'

import {methods} from './wrap-event-emitter'
import arrRemove from './util/array-remove'
import validObject from './util/valid-object'

const hasOwnProperty = Object.prototype.hasOwnProperty
const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
const arrFrom        = Array.from
const emit           = methods.emitAsync

/**
 * Creates a pipeline between two event emitters, so that any events emitted by the first emitter are also emitted by the second emitter.
 *
 * @param {import('./event-emitter').EventEmitter} e1 - The first event emitter.
 * @param {import('./event-emitter').EventEmitter} e2 - The second event emitter.
 * @param {string} [name='emitAsync'] - The name of the event to pipe (defaults to 'emitAsync').
 * @returns {Object} - An object with a `close` method that removes the pipeline between the two event emitters.
 * @throws {TypeError} - If either of the arguments is not an event emitter object.
 */
export function pipeAsync(e1, e2/* , name */) {
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

export default pipeAsync
