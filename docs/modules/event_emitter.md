[events-ex](../README.md) / [Exports](../modules.md) / event-emitter

# Module: event-emitter

## Table of contents

### References

- [default](event_emitter.md#default)

### Variables

- [methods](event_emitter.md#methods)

### Functions

- [wrapEventEmitter](event_emitter.md#wrapeventemitter)

## References

### default

Renames and re-exports [wrapEventEmitter](event_emitter.md#wrapeventemitter)

## Variables

### methods

• `Const` **methods**: `any`

#### Defined in

[src/event-emitter.js:6](https://github.com/snowyu/events-ex.js/blob/892d26d/src/event-emitter.js#L6)

## Functions

### wrapEventEmitter

▸ **wrapEventEmitter**(`o?`): `any`

Create or inject the eventable instance into the object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `o?` | `any` | the optional instance to eventable |

#### Returns

`any`

o or new Event instance

#### Defined in

[src/event-emitter.js:33](https://github.com/snowyu/events-ex.js/blob/892d26d/src/event-emitter.js#L33)
