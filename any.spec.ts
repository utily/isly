import "jest"
import { isly } from "./index"

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

		expect(anyType.is("42")).toBe(true)
		expect(anyType.is(null)).toBe(false)
		expect(anyType.is(undefined)).toBe(false)
		expect(anyType.flaw(undefined)).toEqual({ type: "any" })
	})
})
