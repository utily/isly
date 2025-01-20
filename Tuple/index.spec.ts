import { isly } from "../index"

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
		expect(tuple.is([])).toBe(false)
		expect(tuple.is(["foo", "bar"])).toBe(true)
		expect(tuple.flaw([5, "bar"])).toEqual({ flaws: [{ property: 0, type: "string" }], type: "[string, string]" })
	})
	it("[object, string] get", () => {
		type User = {
			email: string
		}
		const userStringTupleType = isly.tuple(isly.object<User>({ email: isly.string() }), isly.string())

		const value: [User, string] = [
			{
				email: `test@example.com`,
				password: "shouldBeSecret",
			} as User,
			"abc",
		]

		const userStringTuple = userStringTupleType.get(value)
		expect(userStringTuple).toHaveLength(2)
		expect(userStringTuple?.[0]).toHaveProperty("email")
		expect(userStringTuple?.[0]).not.toHaveProperty("password")
		expect(userStringTuple?.[1]).toEqual("abc")
	})
})
