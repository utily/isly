import "jest"
import * as isly from "./index"

describe("isly.Object", () => {
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
		expect(type.is(undefined)).toBeFalsy()
		expect(type.flaw({ currency: "SEK" })).toEqual({
			type: '{"amount":"number","currency":"string"}',
			flaws: [{ property: "amount", type: "number" }],
		})
	})
	it("Item", () => {
		interface Item {
			id: string
			number: number
		}
		const type = isly.object<Item>({ id: isly.string(), number: isly.number() }, "Item")
		const is = type.is
		const flaw = type.flaw

		expect(is({ id: "abc001", number: 1337 })).toEqual(true)

		expect(flaw({})).toEqual({
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
		}
		interface Item2 extends Item1 {
			i2: number
		}
		const typeItem1 = isly.object<Item1>({ i1: isly.number() }, "Item1")
		const typeItem2 = typeItem1.extend<Item2>({ i2: isly.number(), i1: isly.number(value => value >= 400) }, "Item2")

		expect(typeItem1.is({ i1: 200 })).toBeTruthy()
		expect(typeItem1.is({ i1: 200, i2: 2 })).toBeTruthy()

		expect(typeItem2.is({ i1: 400, i2: 2 })).toBeTruthy()
		expect(typeItem2.is({ i1: 400 })).toBeFalsy()
		expect(typeItem2.is({ i1: 300, i2: 2 })).toBeFalsy()

		expect(typeItem2.flaw({})).toEqual({
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
})
