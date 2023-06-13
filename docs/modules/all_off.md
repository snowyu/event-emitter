[events-ex](../README.md) / [Exports](../modules.md) / all-off

# Module: all-off

## Table of contents

### References

- [default](all_off.md#default)

### Functions

- [allOff](all_off.md#alloff)

## References

### default

Renames and re-exports [allOff](all_off.md#alloff)

## Functions

### allOff

▸ **allOff**(`emitter`, `type?`): `EventEmitter`

Removes all listeners for a specific event or all events from an event emitter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | The event emitter to remove listeners from. |
| `type?` | `string` | The event to remove listeners for. If not provided, all listeners for all events will be removed. |

#### Returns

`EventEmitter`

- The event emitter with all listeners removed.

#### Defined in

[src/all-off.js:12](https://github.com/snowyu/events-ex.js/blob/892d26d/src/all-off.js#L12)
