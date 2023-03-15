import "jest"
import { isly } from "./index"

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
			flaws: [{ property: "a (value)", type: "string" }],
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
					property: "c (key)",
					type: "string",
					condition: '"a" | "b"',
				},
			],
		})
	})
	it("record, number as key", () => {
		const type = isly.record(isly.number(), isly.string())

		expect(type.is({ 1: "abc001", 2: "1337" })).toBeTruthy()
		expect(type.is({ 1: "abc001", 2: "1337", "-1": "abc" })).toBeTruthy()
		expect(type.is({ 0.1: "abc001", "-12.2": "1337", "-100": "abc" })).toBeTruthy()
		expect(type.is({ 1: "abc001", 2: "1337", a: 42 })).toBeFalsy()

		expect(type.flaw({ c: "hej" })).toEqual({
			type: "Record<number, string>",
			flaws: [
				{
					property: "c (key)",
					type: "number",
				},
			],
		})
	})
	it("record, positive integer as key", () => {
		const type = isly.record(isly.number(["positive", "integer"]), isly.string())

		expect(type.is({ 1: "abc001", 2: "1337" })).toBeTruthy()
		expect(type.is({ 1: "abc001", 2: "1337", a: 42 })).toBeFalsy()
		expect(type.is({ 1: "abc001", 2: "1337", "-1": "abc" })).toBeFalsy()

		expect(type.flaw({ c: "hej" })).toEqual({
			type: "Record<number, string>",
			flaws: [
				{
					property: "c (key)",
					type: "number",
					condition: "> 0 & Number.isInteger",
				},
			],
		})
	})
})
