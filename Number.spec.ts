import "jest"
import * as isly from "./index"

describe("isly.Number", () => {
	it("isly.number()", () => {
		const type = isly.number()
		const is = type.is.bind(type)
		expect(is(13.37)).toEqual(true)
		const flaw = type.flaw.bind(type)
		expect(flaw({})).toEqual({ type: "number" })
	})
	it('isly.number("positive")', () => {
		const type = isly.number()
		const is = type.is.bind(type)
		expect(is(13.37)).toEqual(true)
		const flaw = type.flaw.bind(type)
		expect(flaw({})).toEqual({ type: "number" })
	})
})
