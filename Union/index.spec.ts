import { isly } from "../index"

describe('isly("union")', () => {
	// TypeScript compile error if not working
	it("type narrowing", () => {
		const type = isly("union", isly("string"), isly("number"))
		const value: boolean | string | any = "garbage" as any
		if (type.is(value)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const union: string | number = value
		}
	})
	it("union (2)", () => {
		const type = isly("union", isly("number"), isly("string"))
		expect(type.is(13.37)).toEqual(true)
		expect(type.flawed({})).toEqual({
			name: "(number | string)",
			description: "Union of base types.",
			flaws: [
				{
					description: "Any finite numeric value.",
					name: "number",
				},
				{
					description: "A string value.",
					name: "string",
				},
			],
		})
	})
	it('isly("boolean"), isly("number"), isly("string")', () => {
		const unionType = isly("union", isly("boolean"), isly("number"), isly("string"))
		expect(unionType.is(13.37)).toEqual(true)
		expect(unionType.flawed({})).toEqual({
			name: "(boolean | number | string)",
			description: "Union of base types.",
			flaws: [
				{
					description: "Value has to be true or false.",
					name: "boolean",
				},
				{
					description: "Any finite numeric value.",
					name: "number",
				},
				{
					description: "A string value.",
					name: "string",
				},
			],
		})
	})
	it("union (6)", () => {
		const unionType = isly(
			"union",
			isly("string", "value", "a"),
			isly("string", "value", "b"),
			isly("string", "value", "c"),
			isly("string", "value", "d"),
			isly("string", "value", "e"),
			isly("string", "value", "f")
		)
		expect(unionType.is("b")).toEqual(true)
		expect(unionType.is(13.37)).toEqual(false)
		expect(unionType.is(13.37)).toEqual(false)

		expect(unionType.flawed({})).toEqual({
			name: "('a' | 'b' | 'c' | 'd' | 'e' | 'f')",
			description: "Union of base types.",
			flaws: [
				{
					name: "'a'",
					condition: ["value: 'a'"],
					description: "One of: a.",
				},
				{
					name: "'b'",
					condition: ["value: 'b'"],
					description: "One of: b.",
				},
				{
					name: "'c'",
					condition: ["value: 'c'"],
					description: "One of: c.",
				},
				{
					name: "'d'",
					condition: ["value: 'd'"],
					description: "One of: d.",
				},
				{
					name: "'e'",
					condition: ["value: 'e'"],
					description: "One of: e.",
				},
				{
					name: "'f'",
					condition: ["value: 'f'"],
					description: "One of: f.",
				},
			],
		})
	})
	it("union (7)", () => {
		type A = "A"
		type B = "B"
		type C = "C"
		type D = "D"
		type E = "E"
		type F = "F"
		type G = "G"
		type Letters = A | B | C | D | E | F | G
		const letters = isly<Letters>(
			"union",
			isly<A>("string", "value", "A"),
			isly<B>("string", "value", "B"),
			isly<C>("string", "value", "C"),
			isly<D>("string", "value", "D"),
			isly<E>("string", "value", "E"),
			isly<F>("string", "value", "F"),
			isly<G>("string", "value", "G")
		)
		expect(letters.is("B")).toEqual(true)
		expect(letters.is(13.37)).toEqual(false)
		expect(letters.is(13.37)).toEqual(false)

		expect(letters.flawed({})).toEqual({
			name: "('A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G')",
			description: "Union of base types.",
			flaws: [
				{
					name: "'A'",
					condition: ["value: 'A'"],
					description: "One of: A.",
				},
				{
					name: "'B'",
					condition: ["value: 'B'"],
					description: "One of: B.",
				},
				{
					name: "'C'",
					condition: ["value: 'C'"],
					description: "One of: C.",
				},
				{
					name: "'D'",
					condition: ["value: 'D'"],
					description: "One of: D.",
				},
				{
					name: "'E'",
					condition: ["value: 'E'"],
					description: "One of: E.",
				},
				{
					name: "'F'",
					condition: ["value: 'F'"],
					description: "One of: F.",
				},
				{
					name: "'G'",
					condition: ["value: 'G'"],
					description: "One of: G.",
				},
			],
		})
	})
	it("prune", () => {
		type User = {
			email: string
		}
		type Error = {
			message: string
		}
		type MyUnion = User | Error
		const userType = isly<User>("object", { email: isly("string") })
		const errorType = isly<Error>("object", { message: isly("string") })
		const unionType = isly("union", userType, errorType)
		const userWithPassword: User & { password: string } = {
			email: `test@example.com`,
			password: "shouldBeSecret",
		}
		const data: MyUnion[] = [userWithPassword, { message: "Failed" }]
		data.forEach(data => {
			const pruned = unionType.prune(data)
			expect(pruned).not.toBeFalsy()
			if (pruned) {
				expect(data).toMatchObject(pruned)
				expect(pruned).not.toHaveProperty("password")
			}
		})
	})
})
