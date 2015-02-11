'use strict';

function listener() {}
function listener2() {}

var tests = module.exports = {}

//t=events; a=assert
tests['listeners with only one item'] = function (events, t) {
  var e1 = new events.EventEmitter();

  e1.on('foo', listener);
  var fooListeners = e1.listeners('foo');
  t.deepEqual(e1.listeners('foo'), [listener]);

  e1.removeAllListeners('foo');
  t.deepEqual(e1.listeners('foo'), []);
  t.deepEqual(fooListeners, [listener]);

};
