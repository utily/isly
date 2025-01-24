import { isly } from "../index"

describe("isly.boolean", () => {
	// TypeScript compile error if not working
	it("TypeScript narrowing", () => {
		const booleanType = isly("boolean")
		const isNarrowingWorking: boolean | string | any = "garbage" as any
		if (booleanType.is(isNarrowingWorking)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const myBoolean: boolean = isNarrowingWorking
		}
	})
	it("generic", () => {
		const booleanType = isly("boolean")

		expect(booleanType.is(true)).toBe(true)
		expect(booleanType.is(false)).toBe(true)

		expect(booleanType.is(0)).toBe(false)

		// expect(booleanType.flaw(42)).toEqual({ type: "boolean" })
	})
	it("true", () => {
		const booleanType = isly("boolean", true)
		expect(booleanType.is(true)).toBe(true)

		expect(booleanType.is(false)).toBe(false)
		expect(booleanType.is(0)).toBe(false)

		// expect(booleanType.flaw(false)).toEqual({ type: "true" })
	})
	it("false", () => {
		const booleanType = isly("boolean", false)

		expect(booleanType.is(false)).toBe(true)

		expect(booleanType.is(true)).toBe(false)
		expect(booleanType.is(0)).toBe(false)

		// expect(booleanType.flaw(0)).toEqual({ type: "false" })
	})
	// it("definition", () =>
	// 	expect(isly("boolean").definition).toEqual({ name: "boolean", description: "Value has to be true or false." }))
})
