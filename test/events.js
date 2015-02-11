'use strict';

module.exports = function (events, t) {
  var result = {};
  var tests = {};
  result['listeners'] = require('./events-listeners')(events, t);
  result['add listeners'] = require('./test-event-emitter-add-listeners');
  result['remove listeners'] = require('./events-remove-listeners')(events, t);
  result['once'] =require('./test-event-emitter-once');
  result['modify in emit'] =require('./test-event-emitter-modify-in-emit');
  result['emitter subclass'] =require('./test-event-emitter-subclass');
  result['remove-all-listeners'] =require('./test-event-emitter-remove-all-listeners');
  return result;
}


