import { isly } from "../index"

describe("isly.function", () => {
	it("generic", () => {
		const functionType = isly.function()

		expect(
			functionType.is(function test() {
				return 0
			})
		).toBe(true)
		expect(functionType.is(() => 0)).toBe(true)
		expect(functionType.is(null)).toBe(false)
		expect(functionType.is(undefined)).toBe(false)
		expect(functionType.flaw(undefined)).toEqual({ type: "function" })
	})
})
