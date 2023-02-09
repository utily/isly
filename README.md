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
