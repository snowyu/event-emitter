[events-ex](../README.md) / [Exports](../modules.md) / pipe-async

# Module: pipe-async

## Table of contents

### References

- [default](pipe_async.md#default)

### Functions

- [pipeAsync](pipe_async.md#pipeasync)

## References

### default

Renames and re-exports [pipeAsync](pipe_async.md#pipeasync)

## Functions

### pipeAsync

▸ **pipeAsync**(`e1`, `e2`, `...args`): `any`

Creates a pipeline between two event emitters, so that any events emitted by the first emitter are also emitted by the second emitter.

**`Throws`**

- If either of the arguments is not an event emitter object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e1` | `EventEmitter` | The first event emitter. |
| `e2` | `EventEmitter` | The second event emitter. |
| `...args` | `any` | - |

#### Returns

`any`

- An object with a `close` method that removes the pipeline between the two event emitters.

#### Defined in

[src/pipe-async.js:21](https://github.com/snowyu/events-ex.js/blob/892d26d/src/pipe-async.js#L21)
