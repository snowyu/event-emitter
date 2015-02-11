// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = function (events, assert) {

  var actualRemoved = [];
  var expectedRemoved = ['bar', 'baz', 'baz'];

  function getOnRemoveListener(actualRemoved) {
    return function onRemoveListener(type) {
      actualRemoved.push(type)
    }
  }

  function listener() {}

  var e1 = new events.EventEmitter();
  e1.on('foo', listener);
  e1.on('bar', listener);
  e1.on('baz', listener);
  e1.on('baz', listener);
  var fooListeners = e1.listeners('foo');
  var barListeners = e1.listeners('bar');
  var bazListeners = e1.listeners('baz');
  e1.on('removeListener', getOnRemoveListener(actualRemoved));
  e1.removeAllListeners('bar');
  e1.removeAllListeners('baz');

  assert.deepEqual(e1.listeners('foo'), [listener]);
  assert.deepEqual(e1.listeners('bar'), []);
  assert.deepEqual(e1.listeners('baz'), []);
  // after calling removeAllListeners,
  // the old listeners array should stay unchanged
  assert.deepEqual(fooListeners, [listener]);
  assert.deepEqual(barListeners, [listener]);
  assert.deepEqual(bazListeners, [listener, listener]);
  // after calling removeAllListeners,
  // new listeners arrays are different from the old
  assert.notEqual(e1.listeners('bar'), barListeners);
  assert.notEqual(e1.listeners('baz'), bazListeners);

  var e2 = new events.EventEmitter();
  e2.on('foo', listener);
  e2.on('bar', listener);
  // expect LIFO order
  var actualRemoved1 = [];
  var expectedRemoved1 = ['foo', 'bar', 'removeListener'];
  var actualRemoved2 = [];
  var expectedRemoved2 = ['foo', 'bar'];

  e2.on('removeListener', getOnRemoveListener(actualRemoved1));
  e2.on('removeListener', getOnRemoveListener(actualRemoved2));
  e2.removeAllListeners();
  assert.deepEqual([], e2.listeners('foo'));
  assert.deepEqual([], e2.listeners('bar'));

  var e3 = new events.EventEmitter();
  e3.on('removeListener', listener);
  // check for regression where removeAllListeners throws when
  // there exists a removeListener listener, but there exists
  // no listeners for the provided event type
  try {
    e3.removeAllListeners('foo');
  }
  catch(e) {
    assert.fail('should not throws:', e);
  }
  //assert.notThrow(e3.removeAllListeners.bind(e3, 'foo'));
  
  assert.deepEqual(actualRemoved.sort(), expectedRemoved.sort());
  assert.deepEqual(actualRemoved1.sort(), expectedRemoved1.sort());
  assert.deepEqual(actualRemoved2.sort(), expectedRemoved2.sort());

}

