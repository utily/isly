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
	children?: DemoType[]
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
	// Recursive:
	children: isly.optional(isly.array(isly.lazy(() => type, "DemoType"))),
})
const data: DemoType | any = api.getMyExternalData()

if (type.is(data)) {
	// `data` is now DemoType
}
```
