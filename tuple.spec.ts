import "jest"
import { isly } from "./index"

describe("isly.tuple", () => {
	// TypeScript compile error if not working
	it("TypeScript narrowing", () => {
		type TestTuple = [string, number]
		// With generic provided
		isly.tuple<TestTuple>(isly.string(), isly.number())
		// without:
		const testTupleType = isly.tuple(isly.string(), isly.number())
		const isNarrowingWorking: boolean | string | any = "garbage" as any
		if (testTupleType.is(isNarrowingWorking)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const myTestTuple: TestTuple = isNarrowingWorking
		}
	})
	it("[string, string]", () => {
		const tuple = isly.tuple(isly.string(), isly.string())
		expect(tuple.is([])).toBeFalsy()
		expect(tuple.is(["foo", "bar"])).toBeTruthy()
		expect(tuple.flaw([5, "bar"])).toEqual({ flaws: [{ property: 0, type: "string" }], type: "[string, string]" })
	})
})
