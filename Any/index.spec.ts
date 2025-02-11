import { isly } from "../index"

describe("isly.any", () => {
	// TypeScript compile error if not working
	it("type narrowing", () => {
		const type = isly.any()
		const value: boolean | string | any = "garbage" as any
		if (type.is(value)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const data: { a: 1 } = value
		}
	})
	it("generic", () => {
		const type = isly.any()
		expect(type.is("42")).toBe(true)
		expect(type.is(null)).toBe(false)
		expect(type.is(undefined)).toBe(false)
		expect(type.flawed(undefined)).toEqual({ name: "any", description: "Anything except undefined." })
	})
})
