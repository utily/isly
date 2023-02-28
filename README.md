# isly

Library for type checking.

Usage:

```typescript
type DemoType = {
	anyNumber: number
	numberOf: number
	temperature: number

	message: string
	email: string
	currency: "SEK" | "EUR"

	new: boolean
	fromServer: true

	myTuple: [string, number]
	myUnion: string | number
	myArray: string[]

	children?: DemoType[]

	regExp: RegExp

	testMethod?: () => boolean
}

const type: isly.Type<DemoType> = isly.object({
	// number
	anyNumber: isly.number(),
	numberOf: isly.number("positive"),
	temperature: isly.number(value => value > -273.15),
	// string
	message: isly.string(),
	email: isly.string(/\S+@\S+\.\S+/),
	currency: isly.string(["SEK", "EUR"]),
	// boolean
	new: isly.boolean(),
	fromServer: isly.boolean(true),

	myTuple: isly.tuple(isly.string(), isly.number()),
	myUnion: isly.union<DemoType["myUnion"]>(isly.string(), isly.number()),
	myArray: isly.array(isly.string(), { criteria: "minLength", value: 1 }),

	// Recursive, optional:
	children: isly.optional(isly.array(isly.lazy(() => type, "DemoType"))),

	// Instanceof-test is made with a custom is-function.
	regExp: isly.fromIs<RegExp>("RegExp", value => value instanceof RegExp),

	// function:
	// This only validate if it is a function,
	// not the signature of it.
	// JSON do not support this type but exists for
	// completeness.
	testMethod: isly.optional(isly.function<DemoType["testMethod"]>()),
})

const data: DemoType | any = api.getMyExternalData()

if (!type.is(data)) {
	const error = type.flaw(data)
} else {
	// `data` is for sure DemoType, use it!
}
```

## Extending types

`isly.object()` returns a type which is extendable.

```typescript
interface Item1 {
	i1: number
}
interface Item2 extends Item1 {
	i2: number
}
interface Item3 extends Item2 {
	i3: number
}

const typeItem1 = isly.object<Item1>({ i1: isly.number() }, "Item1")
// It is possible (but optional) to add conditions to properties in the base-type:
const typeItem2 = typeItem1.extend<Item2>({ i2: isly.number(), i1: isly.number(value => value >= 400) }, "Item2")
const typeItem3 = typeItem2.extend<Item3>({ i3: isly.number() }, "Item3")
```

## type.value()

Returns the value only if it fits the type, otherwise undefined. Make it easy to use with the _Nullish coalescing operator_ (`??`).

```typescript
const myNumber = 234 / 0 // Infinity
console.log(isly.number(myNumber).value ?? "(No number)") // Outputs (No number)
console.log(isly.number(0).value ?? "(No number)") // Outputs 0
```

## Usage patterns:

This is a possible usage pattern.

Start with:

`Event` is acting like a namespace here, but less boilerplate code to write.

```typescript
// model/Event.ts
import * as isly from "isly"

export interface Event {
	name: string
	description?: string
}

export const Event = isly.object<Event>(
	{
		name: isly.string(),
		description: isly.optional(isly.string()),
	},
	"Event"
)
```

Which is used like:

```typescript
import { Event } from "model/Event"

...
if (!Event.type.is(myValue)) {
	return Event.type.flaw(myValue)
} else {
	// use myValue here!
	...
}
...

```

When a namespace is needed, change the model to:

```typescript
// model/Event.ts
import * as isly from "isly"

export interface Event {
	name: string
	description?: string
}
export namespace Event {
	export const type = isly.object<Event>(
		{
			name: isly.string(),
			description: isly.optional(isly.string()),
		},
		"Event"
	)

	export const is = type.is
	export const flaw = type.flaw
	// More stuff goes here:
	...
}
```
