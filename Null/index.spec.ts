import { creator as isly } from "../index"

describe("isly.null()", () => {
	it("TypeScript narrowing", () => {
		const value = "garbage" as unknown
		if (isly.null().is(value)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const data: null = value
		}
	})
	it("generic", () => {
		const type = isly.null()
		expect(type.is(null)).toEqual(true)
		expect(type.is(42)).toEqual(false)
		expect(type.flawed(42)).toEqual({ name: "null", description: "Value has to be null." })
		expect(type.is(undefined)).toEqual(false)
	})
	it("prune", () => {
		const type = isly.null()
		expect(type.prune("42")).toEqual(undefined)
		expect(type.prune(null)).toEqual(null)
	})
})
