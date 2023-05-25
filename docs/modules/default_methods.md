[events-ex](../README.md) / [Exports](../modules.md) / default-methods

# Module: default-methods

## Table of contents

### References

- [default](default_methods.md#default)

### Functions

- [getEventableMethods](default_methods.md#geteventablemethods)

## References

### default

Renames and re-exports [getEventableMethods](default_methods.md#geteventablemethods)

## Functions

### getEventableMethods

▸ **getEventableMethods**(`aClass`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `aClass` | `any` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `emit` | (...`args`: `any`) => `any` |
| `emitAsync` | (...`args`: `any`) => `Promise`<`any`\> |
| `listenerCount` | (`emitter`: `any`, `type`: `any`) => `any` |
| `listeners` | (`type`: `any`) => `any` |
| `off` | (`type`: `string`, `listener`: `Function`) => `EventEmitter` |
| `on` | (`type`: `string`, `listener`: `Function`) => `EventEmitter` |
| `once` | (`type`: `string`, `listener`: `Function`) => `EventEmitter` |
| `removeAllListeners` | (`type`: `string`) => `EventEmitter` |
| `setMaxListeners` | (`n`: `any`) => { on(type: string, listener: Function): EventEmitter; once(type: string, listener: Function): EventEmitter; emit(...args: any[]): any; emitAsync(...args: any[]): Promise<any\>; ... 4 more ...; removeAllListeners(type: string): EventEmitter; } |

#### Defined in

[src/default-methods.js:8](https://github.com/snowyu/events-ex.js/blob/b4aaa97/src/default-methods.js#L8)
