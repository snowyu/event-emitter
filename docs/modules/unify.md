[events-ex](../README.md) / [Exports](../modules.md) / unify

# Module: unify

## Table of contents

### References

- [default](unify.md#default)

### Functions

- [unify](unify.md#unify)

## References

### default

Renames and re-exports [unify](unify.md#unify)

## Functions

### unify

▸ **unify**(`e1`, `e2`): `void`

Unifies the event listeners of two event emitter objects so that they share the same set of listeners for each event.

**`Throws`**

- If either of the arguments is not an event emitter object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e1` | `EventEmitter` | The first event emitter object. |
| `e2` | `EventEmitter` | The second event emitter object. |

#### Returns

`void`

#### Defined in

[src/unify.js:17](https://github.com/snowyu/events-ex.js/blob/b4aaa97/src/unify.js#L17)
