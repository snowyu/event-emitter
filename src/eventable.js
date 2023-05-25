import {createAbilityInjector} from 'custom-ability'
import defineProperty from 'util-ex/lib/defineProperty'
import defaultMethods from './default-methods'

function getEventableClass(aClass, aOptions) {
  function Eventable() {}

  if (aClass == null) {aClass = Eventable}
  const methods = defaultMethods(aClass);
  defineProperty(Eventable, 'methods', methods);

  Eventable.defaultMaxListeners = 10;
  Eventable.listenerCount = methods.listenerCount;
  Eventable.prototype.listenerCount = methods.listenerCount;
  Eventable.prototype.emit = methods.emit;
  Eventable.prototype.emitAsync = methods.emitAsync;
  Eventable.prototype.on = methods.on;
  Eventable.prototype.addListener = methods.on;
  Eventable.prototype.off = methods.off;
  Eventable.prototype.removeListener = methods.off;
  Eventable.prototype.removeAllListeners = methods.removeAllListeners;
  Eventable.prototype.once = methods.once;
  Eventable.prototype.setMaxListeners = methods.setMaxListeners;
  Eventable.prototype.listeners = methods.listeners;
  return Eventable;
};

export const Eventable = createAbilityInjector(getEventableClass, true);
export default Eventable;
