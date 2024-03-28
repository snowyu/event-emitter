const CONTINUE = undefined
const DONE = 1
const STOPPED = 2
const ABORT = -1

export const states = {
  CONTINUE,
  DONE,
  STOPPED,
  ABORT,
}

export const RegExpEventSymbol = typeof Symbol === 'function' ? Symbol('RegExpEvent') : '@@RegExpEvent'
