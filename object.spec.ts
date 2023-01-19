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
})
