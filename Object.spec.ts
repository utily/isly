import "jest"
import * as isly from "./index"

describe("isly.Object", () => {
	it("object", () => {
		interface Test {
			amount: number
			currency: string
		}
		const type = isly.object<Test>({ amount: isly.number(), currency: isly.string("SEK", "EUR") })
		const is = type.is.bind(type)
		expect(is({ amount: 13.37, currency: "SEK" })).toEqual(true)
		const flaw = type.flaw.bind(type)
		expect(flaw({ currency: "SEK" })).toEqual({
			type: '{"amount":"number","currency":"string"}',
			flaws: [{ property: "amount", type: "number" }],
		})
	})
})
