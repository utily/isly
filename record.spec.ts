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

		expect(type.is({ amount: "13.37", currency: "SEK" })).toBe(true)
		expect(type.is({})).toBe(true)

		expect(type.is({ amount: 13.37, currency: "SEK" })).toBe(false)
		expect(type.is(undefined)).toBe(false)

		expect(type.flaw({ currency: "SEK", a: 1 })).toEqual({
			type: "Record<string, string>",
			flaws: [{ property: "a (value)", type: "string" }],
		})
	})
	it("record, union as key", () => {
		const type = isly.record(isly.string(["a", "b"] as const), isly.string())

		expect(type.is({ a: "abc001", b: "1337" })).toBe(true)
		expect(type.is({ a: "abc001", b: "1337", c: 42 })).toBe(false)
		expect(type.is({ id: "abc001", number: "1337" })).toBe(false)

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

		expect(type.is({ 1: "abc001", 2: "1337" })).toBe(true)
		expect(type.is({ 1: "abc001", 2: "1337", "-1": "abc" })).toBe(true)
		expect(type.is({ 0.1: "abc001", "-12.2": "1337", "-100": "abc" })).toBe(true)
		expect(type.is({ 1: "abc001", 2: "1337", a: 42 })).toBe(false)

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

		expect(type.is({ 1: "abc001", 2: "1337" })).toBe(true)
		expect(type.is({ 1: "abc001", 2: "1337", a: 42 })).toBe(false)
		expect(type.is({ 1: "abc001", 2: "1337", "-1": "abc" })).toBe(false)

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
	it("record.get", () => {
		type User = {
			email: string
		}
		const userRecordType = isly.record(isly.string(), isly.object<User>({ email: isly.string() }))
		const usersRecords: Record<string, User> = globalThis.Object.fromEntries(
			[...Array(5).keys()].map(id => [
				`${id}`,
				{
					email: `${id}@example.com`,
					password: "shouldBeSecret",
				},
			])
		)
		expect(userRecordType.is(usersRecords)).toBe(true)
		expect(usersRecords["2"]).toHaveProperty("email")
		expect(usersRecords["2"]).toHaveProperty("password")

		const pureUserRecord = userRecordType.get(usersRecords)
		expect(pureUserRecord).toBeTruthy()
		if (pureUserRecord) {
			expect(userRecordType.is(pureUserRecord)).toBe(true)
			expect(pureUserRecord["2"]).toHaveProperty("email")
			expect(pureUserRecord["2"]).not.toHaveProperty("password")
		}
	})
})
