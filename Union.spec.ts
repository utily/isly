import "jest"
import * as isly from "./index"

describe("isly.Union", () => {
	it("union", () => {
		type Test = string | number
		const type = isly.union<Test>(isly.number(), isly.string())
		const is = type.is.bind(type)
		expect(is(13.37)).toEqual(true)
		const flaw = type.flaw.bind(type)
		expect(flaw({})).toEqual({
			type: "number | string",
			flaws: [
				{
					type: "number",
				},
				{
					type: "string",
				},
			],
		})
	})
})
