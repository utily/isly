import { isly } from "../index"

describe("isly.record()", () => {
	// compile error if not working
	it("type narrowing", () => {
		type Type = Record<string, string>
		const type = isly.record<Type>(isly.string(), isly.string())
		const value: boolean | string | any = "garbage" as any
		if (type.is(value)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const data: Type = value
		}
	})

	it("record", () => {
		const type = isly.record(isly.string(), isly.string())
		expect(type.name).toBe("Record<string, string>")

		expect(type.is({ amount: "13.37", currency: "SEK" })).toBe(true)
		expect(type.is({})).toBe(true)

		expect(type.is({ amount: 13.37, currency: "SEK" })).toBe(false)
		expect(type.is(undefined)).toBe(false)

		expect(type.flawed({ currency: "SEK", a: 1 })).toEqual({
			name: "Record<string, string>",
			flaws: [{ property: "a", name: "string" }],
		})
	})
	it("record, union as key", () => {
		const type = isly.record(isly.string("value", "a", "b"), isly.string())

		expect(type.is({ a: "abc001", b: "1337" })).toBe(true)
		expect(type.is({ a: "abc001", b: "1337", c: 42 })).toBe(false)
		expect(type.is({ id: "abc001", number: "1337" })).toBe(false)

		expect(type.flawed({ c: "hej" })).toEqual({
			name: "Record<('a' | 'b'), string>",
			flaws: [
				{
					property: "c",
					name: "('a' | 'b')",
					condition: ["value: ['a', 'b']"],
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

		expect(type.flawed({ c: "hej" })).toEqual({
			name: "Record<number, string>",
			flaws: [
				{
					property: "c",
					name: "number",

				},
			],
		})
	})
	it("record, positive integer as key", () => {
		const type = isly.record(isly.number("positive").restrict("integer"), isly.string())

		expect(type.is({ 1: "abc001", 2: "1337" })).toBe(true)
		expect(type.is({ 1: "abc001", 2: "1337", a: 42 })).toBe(false)
		expect(type.is({ 1: "abc001", 2: "1337", "-1": "abc" })).toBe(false)

		expect(type.flawed({ c: "hej" })).toEqual({
			name: "Record<number, string>",
			flaws: [
				{
					property: "c",
					name: "number",

					condition: ["positive", "integer"],
				},
			],
		})
	})
	it("record.prune", () => {
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

		const pureUserRecord = userRecordType.prune(usersRecords)
		expect(pureUserRecord).toBeTruthy()
		if (pureUserRecord) {
			expect(userRecordType.is(pureUserRecord)).toBe(true)
			expect(pureUserRecord["2"]).toHaveProperty("email")
			expect(pureUserRecord["2"]).not.toHaveProperty("password")
		}
	})
})
