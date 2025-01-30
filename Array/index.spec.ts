import { isly } from "../index"

describe("isly.Array", () => {
	// TypeScript compile error if not working
	it('type narrowing isly("number").array()', () => {
		const type = isly("number").array()
		const value: boolean | string | any = "garbage" as any
		if (type.is(value)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const data: number[] = value
		}
	})
	it('type narrowing isly<number>("array", isly("number"))', () => {
		const type = isly<number>("array", isly("number"))
		const value: boolean | string | any = "garbage" as any
		if (type.is(value)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const data: number[] = value
		}
	})
	it('type narrowing isly("number").array()', () => {
		const type = isly("number").array()
		const value: boolean | string | any = "garbage" as any
		if (type.is(value)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const data: number[] = value
		}
	})
	it.each([
		[isly("number").array(), [42, 13.37], true],
		[isly("number").array(), [42, "test"], false],
	] as const)("is($2) == $3", (type, value, expected) => expect(type.is(value)).toBe(expected))
	it.each([
		[
			isly("number").array(),
			{
				name: "number[]",
				description: "Array of number[].",
				flaws: [
					{
						index: 5,
						name: "number",
						description: "Any finite numeric value.",
					},
				],
			},
		],
		[
			isly("number", "value", 42, 1337).array(),
			{
				name: "(42 | 1337)[]",
				description: "Array of (42 | 1337)[].",
				flaws: [
					{
						index: 0,
						name: "(42 | 1337)",
						condition: ["value(42, 1337)"],
						description: "One of: 42, 1337.",
					},
					{
						index: 2,
						name: "(42 | 1337)",
						condition: ["value(42, 1337)"],
						description: "One of: 42, 1337.",
					},
					{
						index: 3,
						name: "(42 | 1337)",
						condition: ["value(42, 1337)"],
						description: "One of: 42, 1337.",
					},
					{
						index: 4,
						name: "(42 | 1337)",
						condition: ["value(42, 1337)"],
						description: "One of: 42, 1337.",
					},
					{
						index: 5,
						name: "(42 | 1337)",
						condition: ["value(42, 1337)"],
						description: "One of: 42, 1337.",
					},
				],
			},
		],
		[isly("union", isly("number"), isly("string")).array(), false],
	] as const)("flawed(%s) == %s", (type, expected) =>
		expect(type.flawed([13.37, 42, 0, 1, 3.1415, "attraction"])).toEqual(expected)
	)
	it("number[]", () => {
		const type = isly("array", isly("number"))
		expect(type.is([])).toBe(true)
		expect(type.is([1, 2, 3])).toBe(true)
		expect(type.is(0)).toBe(false)
		expect(type.flawed(42)).toEqual({
			name: "number[]",
			description: "Array of number[].",
			flaws: [
				{
					name: "number",
					description: "Any finite numeric value.",
				},
			],
		})
		expect(type.flawed(["test", true])).toEqual({
			name: "number[]",
			description: "Array of number[].",
			flaws: [
				{
					index: 0,
					name: "number",
					description: "Any finite numeric value.",
				},
				{
					index: 1,
					name: "number",
					description: "Any finite numeric value.",
				},
			],
		})
		expect(type.flawed([1, 2, undefined])).toEqual({
			name: "number[]",
			description: "Array of number[].",
			flaws: [
				{
					index: 2,
					name: "number",
					description: "Any finite numeric value.",
				},
			],
		})
	})
	it("(number | string)[]", () => {
		const arrayType = isly("union", isly("string"), isly("number")).array()
		expect(arrayType.flawed(undefined)).toEqual({
			description: "Array of (string | number)[].",
			name: "(string | number)[]",
			flaws: [
				{
					name: "(string | number)",
					description: "Union of base types.",
					flaws: [
						{
							name: "string",
							description: "A string value.",
						},
						{
							name: "number",
							description: "Any finite numeric value.",
						},
					],
				},
			],
		})
	})

	it("number[] with length criteria", () => {
		const type = isly("number").array().restrict("length", "value", 3)
		expect(type.is([3, 4, 5])).toBe(true)

		expect(type.is([])).toBe(false)

		expect(type.flawed(42)).toEqual({
			name: "number[]",
			condition: ["length.value(3)"],
			description: "Array of number[].",
			flaws: [
				{
					description: "Any finite numeric value.",
					name: "number",
				},
			],
		})
		expect(type.flawed([1, 2, undefined])).toEqual({
			name: "number[]",
			condition: ["length.value(3)"],
			description: "Array of number[].",
			flaws: [
				{
					index: 2,
					name: "number",
					description: "Any finite numeric value.",
				},
			],
		})
		expect(type.flawed([1, 2, 3, 4])).toEqual({
			name: "number[]",
			condition: ["length.value(3)"],
			description: "Array of number[].",
			flaws: [],
		})
	})
	it("number[] with minLength & maxLength criteria", () => {
		const type = isly("number").array().restrict("length", "range", 1, 3)
		expect(type.is([3, 4, 5])).toBe(true)

		expect(type.is([1, 2, 3, 4])).toBe(false)
		expect(type.is([])).toBe(false)

		expect(type.flawed(42)).toEqual({
			name: "number[]",
			condition: ["length.range(1, 3)"],
			description: "Array of number[].",
			flaws: [
				{
					name: "number",
					description: "Any finite numeric value.",
				},
			],
		})
	})
	it("object[] prune", () => {
		type User = {
			email: string
		}
		const userArrayType = isly<User>("object", { email: isly("string") }).array()
		const usersWithPassword: (User & { password: string })[] = [...Array(5).keys()].map(id => ({
			email: `${id}@example.com`,
			password: "shouldBeSecret",
		}))

		const users: User[] | undefined = userArrayType.prune(usersWithPassword)
		expect(users).not.toBeUndefined()
		expect(users?.[2]).toHaveProperty("email")
		expect(users?.[2]).not.toHaveProperty("password")
	})
})
