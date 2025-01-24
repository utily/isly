import { isly } from "../index"

describe("isly.undefined", () => {
	it("TypeScript narrowing", () => {
		const undefinedType = isly("undefined")
		const isNarrowingWorking = "garbage" as unknown
		if (undefinedType.is(isNarrowingWorking)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const myUndefined: undefined = isNarrowingWorking
		}
	})
	it("generic", () => {
		const undefinedType = isly("undefined")
		expect(undefinedType.is(undefined)).toEqual(true)
		expect(undefinedType.is(42)).toEqual(false)
		// expect(undefinedType.flaw(42)).toEqual({ type: "undefined" })
		expect(undefinedType.is(null)).toEqual(false)
	})
	it("get", () => {
		const undefinedType = isly("undefined")
		expect(undefinedType.get("42")).toEqual(undefined)
		expect(undefinedType.get(undefined)).toEqual(undefined)
	})
})
