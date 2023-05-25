export function validCallable(fn) {
  if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
}

export default validCallable
