import { isly } from "../index"

describe("isly.object()", () => {
	// compile error if not working
	it("type narrowing", () => {
		interface Test {
			amount: number
			currency: string
		}
		const type = isly.object({ amount: isly.number(), currency: isly.string("value", ["SEK", "EUR"]) })
		const value: boolean | string | any = "garbage" as any
		if (type.is(value)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const data: Test = value
		}
	})

	it("object", () => {
		interface Test {
			amount: number
			currency: string
		}
		const type = isly.object<Test>({ amount: isly.number(), currency: isly.string("value", ["SEK", "EUR"]) })
		expect(type.name).toBe("{ amount: number, currency: ('SEK' | 'EUR') }")
		expect(type.is({ amount: 13.37, currency: "SEK" })).toBe(true)
		expect(type.is(undefined)).toBe(false)
		expect(type.flawed({ currency: "SEK" })).toEqual({
			name: "{ amount: number, currency: ('SEK' | 'EUR') }",
			flaws: [{ property: "amount", name: "number" }],
		})
	})
	it("{}", () => {
		const type = isly.object({})
		expect(type.name).toBe("{  }")
		expect(type.is({ amount: 13.37, currency: "SEK" })).toEqual(true)
		expect(type.is(undefined)).toBe(false)
		expect(type.flawed(1)).toEqual({
			name: "{  }",
			flaws: [],
		})
	})

	it("Item", () => {
		interface Item {
			id: string
			number: number
		}
		const type = isly.object<Item>({ id: isly.string(), number: isly.number() }, "Item")
		expect(type.is({ id: "abc001", number: 1337 })).toBe(true)
		expect(type.is(undefined)).toBe(false)
		expect(type.is({})).toBe(false)
		expect(type.flawed({})).toEqual({
			name: "Item",
			flaws: [
				{
					property: "id",

					name: "string",
				},
				{
					property: "number",

					name: "number",
				},
			],
		})
	})
	it("extend", () => {
		interface Item1 {
			i1: number
			str: string
		}
		interface Item2 extends Item1 {
			i2: number
		}
		interface Item3 extends Item2 {
			i3: number
		}

		const type1 = isly.object<Item1>({ i1: isly.number(), str: isly.string() }, "Item1")
		const type2 = type1.extend<Item2>({ i2: isly.number(), i1: isly.number("minimum", 400) }, "Item2")
		const type3 = type2.extend<Item3>({ i3: isly.number() }, "Item3")

		expect(type1.is({ i1: 200, str: "a" })).toBe(true)
		expect(type1.is({ i1: 200, i2: 2, str: "a" })).toBe(true)

		expect(type2.is({ i1: 400, i2: 2, str: "a" })).toBe(true)
		expect(type2.is({ i1: 400, str: "a" })).toBe(false)
		expect(type2.is({ i1: 300, i2: 2, str: "a" })).toBe(false)

		expect(type3.is({ i1: 400, i2: 2, i3: 42, str: "a" })).toBe(true)
		expect(type3.is({ i1: 400, i3: 42, str: "a" })).toBe(false)
		expect(type3.is({ i1: 400, i2: 42, str: "a" })).toBe(false)
		expect(type3.is({ i1: 400, i3: 42, str: "a" })).toBe(false)
		expect(type3.is({ i1: 200, i2: 2, i3: 42, str: "a" })).toBe(false)
		expect(type2.flawed({ str: "a" })).toEqual({
			name: "Item2",
			flaws: [
				{
					property: "i1",
					name: "number",
					condition: ["minimum: 400"],
				},
				{
					property: "i2",
					name: "number",
				},
			],
		})
	})
	it("get", () => {
		interface Item1 {
			a: number
			b: string
		}
		const typeItem1 = isly.object<Item1>({ a: isly.number(), b: isly.string() }, "Item1")

		expect(typeItem1.prune({ i1: 200, str: "a" })).toBeUndefined()
		expect(typeItem1.prune({ a: 200 })).toBeUndefined()
		expect(typeItem1.prune({ a: 200, b: "a" })).toEqual({ a: 200, b: "a" })
		expect(typeItem1.prune({ a: 200, b: "a", c: true })).toEqual({ a: 200, b: "a" })
	})
	it("prune extends", () => {
		interface Item1 {
			a: number
			b: string
		}
		interface Item2 extends Item1 {
			c: boolean
			d?: number
		}
		const typeItem1 = isly.object<Item1>({ a: isly.number(), b: isly.string() }, "Item1")
		const typeItem2 = typeItem1.extend<Item2>({ c: isly.boolean(), d: isly.number().optional() }, "Item2")

		expect(typeItem2.prune({ c: true })).toBeUndefined()

		expect(typeItem1.prune({ a: 200, b: "a" })).toEqual({ a: 200, b: "a" })
		expect(typeItem2.prune({ a: 200, b: "a" })).toBeUndefined()
		expect(typeItem2.prune({ a: 200 })).toBeUndefined()
		expect(typeItem2.prune({ a: 200, b: "a" })).toBeUndefined()
		expect(typeItem2.prune({ a: 200, b: "a", c: true })).toEqual({ a: 200, b: "a", c: true })
		expect(typeItem2.prune({ a: 200, b: "a", c: true, d: 0.1 })).toEqual({ a: 200, b: "a", c: true, d: 0.1 })
		expect(typeItem2.prune({ a: 200, b: "a", c: true, e: "a" })).toEqual({ a: 200, b: "a", c: true })
		expect(typeItem2.prune({ a: 200, b: "a", c: true, d: undefined })).toEqual({ a: 200, b: "a", c: true })
		expect(typeItem2.prune({ a: 200, b: "a", c: true, d: undefined })).not.toHaveProperty("d", undefined)
		expect(typeItem2.prune({ a: 200, b: "a", c: true })).not.toHaveProperty("d")
	})
	it("get User-example", () => {
		interface User {
			name: string
		}
		interface UserWithCredentials extends User {
			password: string
		}

		const type = isly.object<User>({ name: isly.string() })
		const userWithCredentialsType = type.extend<UserWithCredentials>({ password: isly.string() })

		const myUser: UserWithCredentials = {
			name: "Joe",
			password: "12345678",
		}
		expect(type.prune(myUser)).toEqual({
			name: "Joe",
		})
	})
	it("object", () => {
		interface Test {
			a: { b: string }
		}
		const type = isly.object<Test>({ a: isly.object({ b: isly.string() }) })
		expect(type.name).toBe("{ a: { b: string } }")
	})
	it("omit", () => {
		interface Test {
			a: { b: string }
			b: number
			c: string
		}
		const type = isly.object<Test>({
			a: isly.object({ b: isly.string() }),
			b: isly.number(),
			c: isly.string(),
		})
		type OmittedTest = Omit<Test, "a">
		const omittedType = type.omit(["a"])

		const test: Test = { a: { b: "test" }, b: 42, c: "test 2" }
		const omittedTest: OmittedTest = { b: 42, c: "test 2" }
		expect(omittedType.is(omittedTest)).toBe(true)
		expect(omittedType.prune(test)).toEqual(omittedTest)
		expect(omittedType.is(omittedType.get(test))).toBe(true)
	})
	it("extend omit", () => {
		interface Test {
			a: { b: string }
			b: number
			c: string
		}
		const type = isly.object<Test>({
			a: isly.object({ b: isly.string() }),
			b: isly.number(),
			c: isly.string(),
		})
		interface OmittedTest extends Omit<Test, "a"> {
			a: boolean[]
		}
		const omittedType = type.omit<"a">(["a"]).extend<OmittedTest>({ a: isly.boolean().array() })
		const omittedTest: OmittedTest = { a: [true, false, true], b: 42, c: "test 2" }
		expect(omittedType.is(omittedTest)).toBe(true)
		expect(omittedType.is(omittedType.get(omittedTest))).toBe(true)
	})
	it("get User-example with omit", () => {
		interface User {
			name: string
		}
		interface UserWithCredentials extends User {
			password: string
		}
		const userType = isly.object<User>({ name: isly.string() })
		const userWithCredentialsType = userType.extend<UserWithCredentials>({ password: isly.string() })

		const userWithoutCredentialsType = userWithCredentialsType.omit(["password"])

		const myUser: UserWithCredentials = {
			name: "Joe",
			password: "12345678",
		}
		expect(userWithoutCredentialsType.prune(myUser)).toEqual({
			name: "Joe",
		})
	})
	it("Advanced extend & omit", () => {
		interface Response {
			status: number
			body: string
		}
		const responseType = isly.object<Response>({ body: isly.string(), status: isly.number("less", 1000) }, "Response")
		const errorResponseType = responseType.extend(
			{ status: isly.number("minimum", 400).restrict("less", 1000) },
			"ErrorResponse"
		)
		const errorResponseWithoutBodyType = errorResponseType.omit(["body"])

		expect(errorResponseWithoutBodyType.name).toBe('Omit<ErrorResponse, "body">')

		expect(responseType.is({ status: 200, body: "payload" })).toBe(true)
		expect(responseType.is({ status: 1000, body: "payload" })).toBe(false)

		expect(errorResponseType.is({ status: 200, body: "payload" })).toBe(false)
		expect(errorResponseType.is({ status: 500, body: "payload" })).toBe(true)
		expect(errorResponseType.is({ status: 1000, body: "payload" })).toBe(false)

		// Test if all conditions still is present:
		expect(errorResponseWithoutBodyType.is({ status: 200 })).toBe(false)
		expect(errorResponseWithoutBodyType.is({ status: 500 })).toBe(true)
		expect(errorResponseWithoutBodyType.is({ status: 1000 })).toBe(false)

		// Extra properties may still be present:
		expect(errorResponseWithoutBodyType.is({ status: 200, body: "payload" })).toBe(false)
		expect(errorResponseWithoutBodyType.is({ status: 500, body: "payload" })).toBe(true)
		expect(errorResponseWithoutBodyType.is({ status: 1000, body: "payload" })).toBe(false)

		// get should not return omitted property and return undefined if all conditions isn't met:
		expect(errorResponseWithoutBodyType.prune({ status: 200, body: "payload" })).toBeUndefined()
		expect(errorResponseWithoutBodyType.prune({ status: 500, body: "payload" })).toEqual({ status: 500 })
		expect(errorResponseWithoutBodyType.prune({ status: 1000, body: "payload" })).toBeUndefined()
	})
	it("Advanced extend & pick", () => {
		interface Response {
			status: number
			body: string
		}
		const responseType = isly.object<Response>({ body: isly.string(), status: isly.number("less", 1000) }, "Response")
		const errorResponseType = responseType.extend(
			{ status: isly.number("minimum", 400).restrict("less", 1000) },
			"ErrorResponse"
		)

		const errorResponseWithoutBodyType = errorResponseType.pick(["status"])

		expect(errorResponseWithoutBodyType.name).toBe('Pick<ErrorResponse, "status">')

		expect(responseType.is({ status: 200, body: "payload" })).toBe(true)
		expect(responseType.is({ status: 1000, body: "payload" })).toBe(false)

		expect(errorResponseType.is({ status: 200, body: "payload" })).toBe(false)
		expect(errorResponseType.is({ status: 500, body: "payload" })).toBe(true)
		expect(errorResponseType.is({ status: 1000, body: "payload" })).toBe(false)

		// Test if all conditions still is present:
		expect(errorResponseWithoutBodyType.is({ status: 200 })).toBe(false)
		expect(errorResponseWithoutBodyType.is({ status: 500 })).toBe(true)
		expect(errorResponseWithoutBodyType.is({ status: 1000 })).toBe(false)

		// Extra properties may still be present:
		expect(errorResponseWithoutBodyType.is({ status: 200, body: "payload" })).toBe(false)
		expect(errorResponseWithoutBodyType.is({ status: 500, body: "payload" })).toBe(true)
		expect(errorResponseWithoutBodyType.is({ status: 1000, body: "payload" })).toBe(false)

		// get should not return omitted property and return undefined if all conditions isn't met:
		expect(errorResponseWithoutBodyType.prune({ status: 200, body: "payload" })).toBeUndefined()
		expect(errorResponseWithoutBodyType.prune({ status: 500, body: "payload" })).toEqual({ status: 500 })
		expect(errorResponseWithoutBodyType.prune({ status: 1000, body: "payload" })).toBeUndefined()
	})
	it("prune", () => {
		expect(isly.object({}).prune({})).toEqual({})
		expect(isly.object({}).prune({ a: 1 })).toEqual({})
		expect(isly.object({ a: isly.number() }).prune({ a: 1, b: 2 })).toEqual({ a: 1 })
		expect(isly.object({ a: isly.string() }).prune({ a: "1", b: 2, c: 3 })).toEqual({ a: "1" })
		expect(isly.object({ a: isly.string("value", "1") }).prune({ a: "1", b: 2, c: 3 })).toEqual({ a: "1" })
	})
})
