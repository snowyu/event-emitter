'use strict';

module.exports = function (events, t) {
  var result = {};
  result['listeners'] = require('./events-listeners')(events, t);
  result['add listeners'] = require('./test-event-emitter-add-listeners');
  result['remove listeners'] = require('./events-remove-listeners')(events, t);
  result['once'] =require('./test-event-emitter-once');
  result['modify in emit'] =require('./test-event-emitter-modify-in-emit');
  result['emitter subclass'] =require('./test-event-emitter-subclass');
  result['remove-all-listeners'] =require('./test-event-emitter-remove-all-listeners');
  result['max-listeners'] =require('./test-event-emitter-max-listeners');
  result['check-listener-leaks'] =require('./test-event-emitter-check-listener-leaks');
  result['emitter-method-names'] =require('./test-event-emitter-method-names');
  result['listeners-side-effects'] =require('./test-event-emitter-listeners-side-effects');
  result['no-error-provided-to-error-event'] =require('./test-event-emitter-no-error-provided-to-error-event');
  result['num-args'] =require('./test-event-emitter-num-args');
  result['set-max-listeners-side-effects'] =require('./test-event-emitter-set-max-listeners-side-effects');
  return result;
}


