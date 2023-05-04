import "jest"
import { isly } from "./index"

describe("isly.object", () => {
	// TypeScript compile error if not working
	it("TypeScript narrowing", () => {
		interface TestObject {
			amount: number
			currency: string
		}
		const testObjectType = isly.object<TestObject>({ amount: isly.number(), currency: isly.string(["SEK", "EUR"]) })
		const isNarrowingWorking: boolean | string | any = "garbage" as any
		if (testObjectType.is(isNarrowingWorking)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const myTestObject: TestObject = isNarrowingWorking
		}
	})

	it("object", () => {
		interface Test {
			amount: number
			currency: string
		}
		const type = isly.object<Test>({ amount: isly.number(), currency: isly.string(["SEK", "EUR"]) })
		expect(type.name).toBe('{"amount":"number","currency":"string"}')
		expect(type.is({ amount: 13.37, currency: "SEK" })).toEqual(true)
		expect(type.is(undefined)).toBe(false)
		expect(type.flaw({ currency: "SEK" })).toEqual({
			type: '{"amount":"number","currency":"string"}',
			flaws: [{ property: "amount", type: "number" }],
		})
	})
	it("{}", () => {
		const type = isly.object()
		expect(type.name).toBe("{}")
		expect(type.is({ amount: 13.37, currency: "SEK" })).toEqual(true)
		expect(type.is(undefined)).toBe(false)
		expect(type.flaw(1)).toEqual({
			type: "{}",
			flaws: [],
		})
	})

	it("Item", () => {
		interface Item {
			id: string
			number: number
		}
		const type = isly.object<Item>({ id: isly.string(), number: isly.number() }, "Item")

		expect(type.is({ id: "abc001", number: 1337 })).toEqual(true)

		expect(type.flaw({})).toEqual({
			type: "Item",
			flaws: [
				{
					property: "id",
					type: "string",
				},
				{
					property: "number",
					type: "number",
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

		const typeItem1 = isly.object<Item1>({ i1: isly.number(), str: isly.string() }, "Item1")
		const typeItem2 = typeItem1.extend<Item2>({ i2: isly.number(), i1: isly.number(value => value >= 400) }, "Item2")
		const typeItem3 = typeItem2.extend<Item3>({ i3: isly.number() }, "Item3")

		expect(typeItem1.is({ i1: 200, str: "a" })).toBe(true)
		expect(typeItem1.is({ i1: 200, i2: 2, str: "a" })).toBe(true)

		expect(typeItem2.is({ i1: 400, i2: 2, str: "a" })).toBe(true)
		expect(typeItem2.is({ i1: 400, str: "a" })).toBe(false)
		expect(typeItem2.is({ i1: 300, i2: 2, str: "a" })).toBe(false)

		expect(typeItem3.is({ i1: 400, i2: 2, i3: 42, str: "a" })).toBe(true)
		expect(typeItem3.is({ i1: 400, i3: 42, str: "a" })).toBe(false)
		expect(typeItem3.is({ i1: 400, i2: 42, str: "a" })).toBe(false)
		expect(typeItem3.is({ i1: 400, i3: 42, str: "a" })).toBe(false)
		expect(typeItem3.is({ i1: 200, i2: 2, i3: 42, str: "a" })).toBe(false)

		expect(typeItem2.flaw({ str: "a" })).toEqual({
			type: "Item2",
			flaws: [
				{
					property: "i1",
					type: "number",
				},
				{
					property: "i2",
					type: "number",
				},
				{
					condition: "custom",
					property: "i1",
					type: "number",
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

		expect(typeItem1.get({ i1: 200, str: "a" })).toBeUndefined()
		expect(typeItem1.get({ a: 200 })).toBeUndefined()
		expect(typeItem1.get({ a: 200, b: "a" })).toEqual({ a: 200, b: "a" })
		expect(typeItem1.get({ a: 200, b: "a", c: true })).toEqual({ a: 200, b: "a" })
	})
	it("get extends", () => {
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

		expect(typeItem2.get({ c: true })).toBeUndefined()

		expect(typeItem1.get({ a: 200, b: "a" })).toEqual({ a: 200, b: "a" })
		expect(typeItem2.get({ a: 200, b: "a" })).toBeUndefined()
		expect(typeItem2.get({ a: 200 })).toBeUndefined()
		expect(typeItem2.get({ a: 200, b: "a" })).toBeUndefined()
		expect(typeItem2.get({ a: 200, b: "a", c: true })).toEqual({ a: 200, b: "a", c: true })
		expect(typeItem2.get({ a: 200, b: "a", c: true, d: 0.1 })).toEqual({ a: 200, b: "a", c: true, d: 0.1 })
		expect(typeItem2.get({ a: 200, b: "a", c: true, e: "a" })).toEqual({ a: 200, b: "a", c: true })
		expect(typeItem2.get({ a: 200, b: "a", c: true, d: undefined })).toEqual({ a: 200, b: "a", c: true })
		expect(typeItem2.get({ a: 200, b: "a", c: true, d: undefined })).toHaveProperty("d", undefined)
		expect(typeItem2.get({ a: 200, b: "a", c: true })).not.toHaveProperty("d")
	})
})
