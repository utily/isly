import { isly } from "../index"

describe("isly.tuple", () => {
	// TypeScript compile error if not working
	it("type narrowing", () => {
		type TestTuple = [string, number]
		// With generic provided
		isly.tuple<TestTuple>(isly.string(), isly.number())
		// without:
		const type = isly.tuple(isly.string(), isly.number())
		const value: boolean | string | any = "garbage" as any
		if (type.is(value)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const data: TestTuple = value
		}
	})
	it("[string, string]", () => {
		const type = isly.tuple(isly.string(), isly.string())
		expect(type.is([])).toBe(false)
		expect(type.is(["foo", "bar"])).toBe(true)
		expect(type.flawed([5, "bar"])).toEqual({
			name: "[string, string]",
			description: "Tuple of [string, string].",
			flaws: [
				{
					description: "A string value.",
					index: 0,
					name: "string",
				},
			],
		})
	})
	it("[object, string] prune", () => {
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

		const userStringTuple = userStringTupleType.prune(value)
		expect(userStringTuple).toHaveLength(2)
		expect(userStringTuple?.[0]).toHaveProperty("email")
		expect(userStringTuple?.[0]).not.toHaveProperty("password")
		expect(userStringTuple?.[1]).toEqual("abc")
	})
})
