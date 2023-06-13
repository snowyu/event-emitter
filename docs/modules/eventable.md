[events-ex](../README.md) / [Exports](../modules.md) / eventable

# Module: eventable

## Table of contents

### References

- [default](eventable.md#default)

### Functions

- [eventable](eventable.md#eventable)

## References

### default

Renames and re-exports [eventable](eventable.md#eventable)

## Functions

### eventable

▸ **eventable**(`targetClass`, `options?`): `Function`

A function that adds(injects) the ability of a specified ability class to a target class.

Note: Maybe the ability will be injected into the inheritance class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `targetClass` | `Function` | The target class to which the ability will be added. |
| `options?` | `AbilityOptions` | An optional ability configuration object. |

#### Returns

`Function`

- An injected target class that takes a class and adds the ability to it using the specified
                      options.

#### Defined in

node_modules/custom-ability/lib/custom-ability.d.ts:103
