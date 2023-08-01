import { isly } from "./index"

describe("isly.undefined", () => {
	it("TypeScript narrowing", () => {
		const undefinedType = isly.undefined()
		const isNarrowingWorking = "garbage" as unknown
		if (undefinedType.is(isNarrowingWorking)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const myUndefined: undefined = isNarrowingWorking
		}
	})
	it("generic", () => {
		expect(isly.undefined().is(undefined)).toEqual(true)
		expect(isly.undefined().is(42)).toEqual(false)
		expect(isly.undefined().flaw(42)).toEqual({ type: "undefined" })
	})
})
