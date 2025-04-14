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
	it.each([
		[{}, true, isly.record(isly.string(), isly.number())],
		[{ key1: 123, key2: 456 }, true, isly.record(isly.string(), isly.number())],
		[{ key1: 123, key2: "not a number" }, false, isly.record(isly.string(), isly.number())],
		[{ 1: "one", 2: "two" }, true, isly.record(isly.number(), isly.string())],
		[{ 1: "one", 2: 2 }, false, isly.record(isly.number(), isly.string())],
		[{ a: "value", b: "value" }, true, isly.record(isly.string("value", "a", "b"), isly.string())],
		[{ a: "value", c: "value" }, false, isly.record(isly.string("value", "a", "b"), isly.string())],
		[{ 1: "one", "-1": "minus one" }, true, isly.record(isly.number(), isly.string())],
		[{ 1: "one", "-1": 1 }, false, isly.record(isly.number(), isly.string())],
		[{ 1: "one", 2: "two", a: "three" }, false, isly.record(isly.number(), isly.string())],
		[{ 1: "one", 2: "two", 3: "three" }, true, isly.record(isly.number("positive").restrict("integer"), isly.string())],
		[
			{ 1: "one", 2: "two", "-1": "minus one" },
			false,
			isly.record(isly.number("positive").restrict("integer"), isly.string()),
		],
		[{ user: { email: "test@example.com" } }, true, isly.record(isly.string(), isly.object({ email: isly.string() }))],
		[
			{ user: { email: "test@example.com", password: "secret" } },
			true,
			isly.record(isly.string(), isly.object({ email: isly.string(), password: isly.string() })),
		],
		[
			{ email: "test@example.com", password: 123 },
			false,
			isly.record(isly.string(), isly.object({ email: isly.string(), password: isly.string() })),
		],
		[
			{ 1930: { opening: 0, period: 0, closing: 0 }, 1931: { opening: 0, period: 0, closing: 0 } },
			true,
			isly.record(
				isly.number("positive").restrict("integer"),
				isly.object({ opening: isly.number(), period: isly.number(), closing: isly.number() })
			),
		],
		[
			{
				1930: { opening: 100, period: 50, closing: 150 },
				1931: { opening: 30, period: -10, closing: 20 },
				totals: { opening: 130, period: 40, closing: 170 },
			},
			true,
			isly.record(
				isly.union(isly.number("positive").restrict("integer"), isly.string("value", "totals")),
				isly.object({ opening: isly.number(), period: isly.number(), closing: isly.number() })
			),
		],
	] as const)("is(%s) == %s", (value, expected, type) => expect(type.is(value)).toBe(expected))
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
			flaws: [{ property: "c", name: "('a' | 'b')", condition: ["value: ['a', 'b']"] }],
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
			flaws: [{ property: "c", name: "number" }],
		})
	})
	it("record, positive integer as key", () => {
		const type = isly.record(isly.number("positive").restrict("integer"), isly.string())
		expect(type.is({ 1: "abc001", 2: "1337" })).toBe(true)
		expect(type.is({ 1: "abc001", 2: "1337", a: 42 })).toBe(false)
		expect(type.is({ 1: "abc001", 2: "1337", "-1": "abc" })).toBe(false)
		expect(type.flawed({ c: "hej" })).toEqual({
			name: "Record<number, string>",
			flaws: [{ property: "c", name: "number", condition: ["positive", "integer"] }],
		})
	})
	it("record.prune", () => {
		type User = { email: string }
		const userRecordType = isly.record(isly.string(), isly.object<User>({ email: isly.string() }))
		const usersRecords: Record<string, User> = globalThis.Object.fromEntries(
			[...Array(5).keys()].map(id => [`${id}`, { email: `${id}@example.com`, password: "shouldBeSecret" }])
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
	it("is(undefined) == false", () => expect(isly.record(isly.string(), isly.string()).is(undefined)).toBe(false))
	it("is({ test: undefined }) == false", () =>
		expect(isly.record(isly.string(), isly.object({})).is({ test: undefined })).toBe(false))
	it("flawed(undefined)", () => expect(isly.record(isly.string(), isly.string()).is(undefined)).toBe(false))
	it("flawed({ test: undefined })", () =>
		expect(isly.record(isly.string(), isly.object({})).is({ test: undefined })).toBe(false))
	it("enumerable", () => {
		const keys = ["key1", "key2", "key3"] as const
		type Key = typeof keys[number]
		const Key = isly.string("value", ...keys)
		type EnumerableRecord = Record<Key, string>
		const EnumerableRecord = isly.record(Key, isly.string())
		const enumerableRecord: EnumerableRecord = { key1: "value1", key2: "value2", key3: "value3" }
		const notEnumerableRecord: Partial<EnumerableRecord> = { key1: "value1" }
		expect(EnumerableRecord.is(enumerableRecord)).toBe(true)
		expect(EnumerableRecord.is(notEnumerableRecord)).toBe(false)
	})
})
