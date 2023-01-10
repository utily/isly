import "jest"
import * as isly from "./index"

describe("boolean", () => {
	// TypeScript compile error if not working
	it("TypeScript narrowing", () => {
		const booleanType = isly.boolean()
		const isNarrowingWorking: boolean | string | any = "garbage" as any
		if (booleanType.is(isNarrowingWorking)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const myBoolean: boolean = isNarrowingWorking
		}
	})
	it("generic", () => {
		const booleanType = isly.boolean()

		expect(booleanType.is(true)).toBeTruthy()
		expect(booleanType.is(false)).toBeTruthy()

		expect(booleanType.is(0)).toBeFalsy()

		expect(booleanType.flaw(42)).toEqual({ type: "boolean" })
	})
	it("true", () => {
		const booleanType = isly.boolean(true)
		expect(booleanType.is(true)).toBeTruthy()

		expect(booleanType.is(false)).toBeFalsy()
		expect(booleanType.is(0)).toBeFalsy()

		expect(booleanType.flaw(false)).toEqual({ type: "true" })
	})
	it("false", () => {
		const booleanType = isly.boolean(false)

		expect(booleanType.is(false)).toBeTruthy()

		expect(booleanType.is(true)).toBeFalsy()
		expect(booleanType.is(0)).toBeFalsy()

		expect(booleanType.flaw(0)).toEqual({ type: "false" })
	})
})
