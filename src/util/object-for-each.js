import value from './valid-object'

const bind                    = Function.prototype.bind
const keys                    = Object.keys

export function forEach(obj, cb /* , thisArg, compareFn */) {
  const thisArg = arguments[2]
  const compareFn = arguments[3]
  obj = Object(value(obj))

  const list = keys(obj)
  if (compareFn) {
    list.sort(typeof compareFn === "function" ? bind.call(compareFn, obj) : undefined)
  }
  return list.forEach(function (key, index) {
    return cb.call(thisArg, obj[key], key, obj, index)
  });
}

export default forEach
