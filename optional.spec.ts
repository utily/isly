import "jest"
import * as isly from "./index"

describe("isly.optional", () => {
	// TypeScript compile error if not working
	it("TypeScript narrowing", () => {
		const optionalStringType = isly.optional(isly.string())
		const isNarrowingWorking: boolean | string | any = "garbage" as any
		if (optionalStringType.is(isNarrowingWorking)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const myOptionalString: undefined | string = isNarrowingWorking
		}
	})
	it("optional string", () => {
		const optionalStringType = isly.optional(isly.string())
		expect(optionalStringType.is("42")).toBeTruthy()
		expect(optionalStringType.is(undefined)).toBeTruthy()
		expect(optionalStringType.is({})).toBeFalsy()
		expect(optionalStringType.flaw(42)).toEqual({ type: "string | undefined" })
	})
})
