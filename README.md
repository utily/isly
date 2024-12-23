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
	myIntersection: { a: string } & { b: string }

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
	myUnion: isly.union(isly.string(), isly.number()),
	myArray: isly.array(isly.string(), { criteria: "minLength", value: 1 }),
	myIntersection: isly.intersection(
		isly.object<{ a: string }>({ a: isly.string() }),
		isly.object<{ b: string }>({ b: isly.string() })
	),

	// Recursive, optional:
	children: isly.array(isly.lazy(() => type, "DemoType")).optional(),

	// Instanceof-test is made with a custom is-function.
	regExp: isly.fromIs<RegExp>("RegExp", value => value instanceof RegExp),

	// function:
	// This only validate if it is a function,
	// not the signature of it.
	// JSON do not support this type but exists for
	// completeness.
	testMethod: isly.function<DemoType["testMethod"]>().optional(),
})

const data: DemoType | any = api.getMyExternalData()

if (!type.is(data)) {
	const error = type.flaw(data)
} else {
	// `data` is for sure DemoType, use it!
}
```

## type.get(value: any)

Returns the value only if it fits the type, otherwise undefined. Make it easy to use with the _Nullish coalescing operator_ (`??`).

For object, a filtered object is returned, with only known properties.

```typescript
const myNumber = 234 / 0 // Infinity
console.log(isly.number().get(myNumber) ?? "(No number)") // Outputs (No number)
console.log(isly.number().get(0) ?? "(No number)") // Outputs 0
```

```typescript
interface User {
	name: string
}
interface UserWithCredentials extends User {
	password: string
}

const userType = isly.object<User>({ name: isly.string() })
const userWithCredentialsType = userType.extend<UserWithCredentials>({ password: isly.string() })

const myUser: UserWithCredentials = {
	name: "Joe",
	password: "12345678",
}
console.log(userType.get(myUser)) // Prints myUser without password.
```

## Modifiers

### .array()

Make an array type.

It is possible to add restrictions to the type as parameters.

```typescript
isly.string().array({ criteria: "minLength", value: 3 })
```

Note, in some circumstances type inference might not always be working the same for
`isly.object({ a: isly.string() }).array()`
and
`isly.array(isly.object({ a: isly.string() }))`

Try the second if the object isn't provided an generic type and the first doesn't work.

### .optional()

Add `| undefined` to type.

### .readonly()

Add `Readonly<...>` to type.

## Modifiers for isly.object

`isly.object()` returns a type which has more modifiers.

### .extend()

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

### .pick()

```typescript
interface User {
	firstName: string
	lastName: string
	password: string
}

type UserWithoutCredentials = Pick<User, "firstName" | "lastName">

const userType = isly.object<User>({ firstName: isly.string(), lastName: isly.string(), password: isly.string() })
const UserWithoutCredentials = userType.pick(["firstName", "lastName"], "UserWithoutCredentials")
```

### .omit()

```typescript
interface User {
	firstName: string
	lastName: string
	password: string
}

type UserWithoutCredentials = Omit<User, "password">

const userType = isly.object<User>({ firstName: isly.string(), lastName: isly.string(), password: isly.string() })
const UserWithoutCredentials = userType.omit(["password"], "UserWithoutCredentials")
```

## Usage patterns

This is a possible usage pattern.

```typescript
// model/Event.ts
import { isly } from "isly"

export interface Event {
	name: string
	description?: string
}
export namespace Event {
	export const type = isly.object<Event>(
		{
			name: isly.string(),
			description: isly.string().optional(),
		},
		"Event"
	)

	export const is = type.is
	export const flaw = type.flaw
	// You can put more stuff here:
	...
}
```

Which is used like:

```typescript
import { Event } from "model/Event"

...
if (!Event.is(myValue)) {
	return Event.flaw(myValue)
} else {
	// use myValue here!
	...
}
...

```
