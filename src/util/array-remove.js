const indexOf = Array.prototype.indexOf
const forEach = Array.prototype.forEach
const splice  = Array.prototype.splice

export function remove(/* ...itemsToRemove */) {
	forEach.call(
		arguments,
		function (item) {
			const index = indexOf.call(this, item)
			if (index !== -1) {splice.call(this, index, 1)}
		},
		this
	)
}

export default remove
