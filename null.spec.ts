import { isly } from "./index"

describe("isly.null", () => {
	it("TypeScript narrowing", () => {
		const nullType = isly.null()
		const isNarrowingWorking = "garbage" as unknown
		if (nullType.is(isNarrowingWorking)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const myNull: null = isNarrowingWorking
		}
	})
	it("generic", () => {
		const nullType = isly.null()
		expect(nullType.is(null)).toEqual(true)
		expect(nullType.is(42)).toEqual(false)
		expect(nullType.flaw(42)).toEqual({ type: "null" })
		expect(nullType.is(undefined)).toEqual(false)
	})
	it("get", () => {
		const nullType = isly.null()
		expect(nullType.get("42")).toEqual(undefined)
		expect(nullType.get(null)).toEqual(null)
	})
})
