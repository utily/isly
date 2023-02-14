import "jest"
import * as isly from "./index"

describe("isly.any", () => {
	it("generic", () => {
		const anyType = isly.any()

		expect(anyType.is("42")).toBeTruthy()
		expect(anyType.is(null)).toBeFalsy()
		expect(anyType.is(undefined)).toBeFalsy
		expect(anyType.flaw(undefined)).toEqual({ type: "any" })
	})
})
