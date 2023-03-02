import "jest"
import * as isly from "./index"

describe("isly.any", () => {
	// TypeScript compile error if not working
	it("TypeScript narrowing", () => {
		const anyType = isly.any()

		const isNarrowingWorking: boolean | string | any = "garbage" as any
		if (anyType.is(isNarrowingWorking)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const myArray: { a: 1 } = isNarrowingWorking
		}
	})
	it("generic", () => {
		const anyType = isly.any()

		expect(anyType.is("42")).toBeTruthy()
		expect(anyType.is(null)).toBeFalsy()
		expect(anyType.is(undefined)).toBeFalsy
		expect(anyType.flaw(undefined)).toEqual({ type: "any" })
	})
})
