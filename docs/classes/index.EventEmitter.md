[events-ex](../README.md) / [Exports](../modules.md) / [index](../modules/index.md) / EventEmitter

# Class: EventEmitter

[index](../modules/index.md).EventEmitter

Class that represents an event emitter.

## Table of contents

### Constructors

- [constructor](index.EventEmitter.md#constructor)

### Properties

- [defaultMaxListeners](index.EventEmitter.md#defaultmaxlisteners)

### Methods

- [emit](index.EventEmitter.md#emit)
- [emitAsync](index.EventEmitter.md#emitasync)
- [listenerCount](index.EventEmitter.md#listenercount)
- [listeners](index.EventEmitter.md#listeners)
- [off](index.EventEmitter.md#off)
- [on](index.EventEmitter.md#on)
- [once](index.EventEmitter.md#once)
- [removeAllListeners](index.EventEmitter.md#removealllisteners)
- [setMaxListeners](index.EventEmitter.md#setmaxlisteners)
- [listenerCount](index.EventEmitter.md#listenercount-1)

## Constructors

### constructor

• **new EventEmitter**()

## Properties

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

#### Defined in

[src/index.d.ts:16](https://github.com/snowyu/events-ex.js/blob/892d26d/src/index.d.ts#L16)

## Methods

### emit

▸ **emit**(`eventName`, `...args`): `any`

Emits the specified event type with the given arguments.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | - |
| `...args` | `any`[] | The event type followed by any number of arguments to be passed to the listener functions. |

#### Returns

`any`

The result of the event.

#### Defined in

[src/index.d.ts:47](https://github.com/snowyu/events-ex.js/blob/892d26d/src/index.d.ts#L47)

___

### emitAsync

▸ **emitAsync**(`eventName`, `...args`): `Promise`<`any`\>

Asynchronously emits the specified event type with the given arguments.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | - |
| `...args` | `any`[] | The event type followed by any number of arguments to be passed to the listener functions. |

#### Returns

`Promise`<`any`\>

A promise that resolves with the result of the event.

#### Defined in

[src/index.d.ts:53](https://github.com/snowyu/events-ex.js/blob/892d26d/src/index.d.ts#L53)

___

### listenerCount

▸ **listenerCount**(`eventName`): `number`

Returns the count of listeners that are registered to listen for the specified event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event to get the listeners for. |

#### Returns

`number`

- the listeners count

#### Defined in

[src/index.d.ts:75](https://github.com/snowyu/events-ex.js/blob/892d26d/src/index.d.ts#L75)

___

### listeners

▸ **listeners**(`eventName`): `Function`[]

Returns an array of functions that are registered to listen for the specified event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event to get the listeners for. |

#### Returns

`Function`[]

- An array of functions that are registered to listen for the specified event.

#### Defined in

[src/index.d.ts:68](https://github.com/snowyu/events-ex.js/blob/892d26d/src/index.d.ts#L68)

___

### off

▸ **off**(`eventName`, `listener`): [`EventEmitter`](index.EventEmitter.md)

Removes a listener function from the specified event type.

**`Throws`**

If the listener is not a function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | - |
| `listener` | `Function` | The listener function to be removed. |

#### Returns

[`EventEmitter`](index.EventEmitter.md)

The EventEmitter instance to allow chaining.

#### Defined in

[src/index.d.ts:41](https://github.com/snowyu/events-ex.js/blob/892d26d/src/index.d.ts#L41)

___

### on

▸ **on**(`eventName`, `listener`): [`EventEmitter`](index.EventEmitter.md)

Adds a listener function to the specified event type.

**`Throws`**

If the listener is not a function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | - |
| `listener` | `Function` | The listener function to be called when the event is emitted. |

#### Returns

[`EventEmitter`](index.EventEmitter.md)

The EventEmitter instance to allow chaining.

#### Defined in

[src/index.d.ts:25](https://github.com/snowyu/events-ex.js/blob/892d26d/src/index.d.ts#L25)

___

### once

▸ **once**(`eventName`, `listener`): [`EventEmitter`](index.EventEmitter.md)

Adds a one-time listener function to the specified event type.

**`Throws`**

If the listener is not a function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | - |
| `listener` | `Function` | The listener function to be called once when the event is emitted. |

#### Returns

[`EventEmitter`](index.EventEmitter.md)

The EventEmitter instance to allow chaining.

#### Defined in

[src/index.d.ts:33](https://github.com/snowyu/events-ex.js/blob/892d26d/src/index.d.ts#L33)

___

### removeAllListeners

▸ **removeAllListeners**(`eventName?`): [`EventEmitter`](index.EventEmitter.md)

Removes all listeners for a specific event or all events from an event emitter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName?` | `string` | The event to remove listeners for. If not provided, all listeners for all events will be removed. |

#### Returns

[`EventEmitter`](index.EventEmitter.md)

- The event emitter with all listeners removed.

#### Defined in

[src/index.d.ts:60](https://github.com/snowyu/events-ex.js/blob/892d26d/src/index.d.ts#L60)

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`EventEmitter`](index.EventEmitter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`EventEmitter`](index.EventEmitter.md)

#### Defined in

[src/index.d.ts:61](https://github.com/snowyu/events-ex.js/blob/892d26d/src/index.d.ts#L61)

___

### listenerCount

▸ `Static` **listenerCount**(`emitter`, `eventName`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | [`EventEmitter`](index.EventEmitter.md) |
| `eventName` | `string` |

#### Returns

`number`

#### Defined in

[src/index.d.ts:76](https://github.com/snowyu/events-ex.js/blob/892d26d/src/index.d.ts#L76)
