import "jest"
import * as isly from "./index"

describe("isly", () => {
	it("string", () => {
		expect(isly.string.is("42")).toEqual(true)
		expect(isly.string.flaw(42)).toEqual({ type: "string" })
	})
	it("object", () => {
		interface Test {
			amount: number
			currency: string
		}
		const type = isly.object<Test>({ amount: isly.number, currency: isly.string })
		const is = type.is.bind(type)
		expect(is({ amount: 13.37, currency: "SEK" })).toEqual(true)
		const flaw = type.flaw.bind(type)
		expect(flaw({ currency: "SEK" })).toEqual({
			type: '{"amount":"number","currency":"string"}',
			flaws: [{ property: "amount", type: "number" }],
		})
	})
	it("union", () => {
		type Test = string | number
		const type = isly.union<Test>(isly.number, isly.string)
		const is = type.is.bind(type)
		expect(is(13.37)).toEqual(true)
		const flaw = type.flaw.bind(type)
		expect(flaw({})).toEqual({ type: "number | string" })
	})
})
