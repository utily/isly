import "jest"
import * as isly from "./index"

describe("isly.record", () => {
	// TypeScript compile error if not working
	it("TypeScript narrowing", () => {
		type TestRecord = Record<string, string>

		const testRecordType = isly.record<TestRecord>(isly.string(), isly.string())
		const isNarrowingWorking: boolean | string | any = "garbage" as any
		if (testRecordType.is(isNarrowingWorking)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const myTestObject: TestRecord = isNarrowingWorking
		}
	})

	it("record", () => {
		const type = isly.record(isly.string(), isly.string())
		expect(type.name).toBe("Record<string, string>")

		expect(type.is({ amount: "13.37", currency: "SEK" })).toBeTruthy()
		expect(type.is({})).toBeTruthy()

		expect(type.is({ amount: 13.37, currency: "SEK" })).toBeFalsy()
		expect(type.is(undefined)).toBeFalsy()

		expect(type.flaw({ currency: "SEK", a: 1 })).toEqual({
			type: "Record<string, string>",
			flaws: [{ property: "a(value)", type: "string" }],
		})
	})
	it("record, union as key", () => {
		const type = isly.record(isly.string(["a", "b"] as const), isly.string())

		expect(type.is({ a: "abc001", b: "1337" })).toBeTruthy()
		expect(type.is({ a: "abc001", b: "1337", c: 42 })).toBeFalsy()
		expect(type.is({ id: "abc001", number: "1337" })).toBeFalsy()

		expect(type.flaw({ c: "hej" })).toEqual({
			type: "Record<string, string>",
			flaws: [
				{
					property: "c(key)",
					type: "string",
					condition: '"a" | "b"',
				},
			],
		})
	})
})
