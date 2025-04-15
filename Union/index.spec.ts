import { isly } from "../index"

describe("isly.union()", () => {
	// TypeScript compile error if not working
	it("type narrowing", () => {
		const type = isly.union(isly.string(), isly.number())
		const value: boolean | string | any = "garbage" as any
		if (type.is(value)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const union: string | number = value
		}
	})
	// TypeScript compile error if not working
	it("type narrowing using and", () => {
		const type = isly.string().and(isly.number())
		const value: boolean | string | any = "garbage" as any
		if (type.is(value)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const union: string | number = value
		}
	})
	it.each([
		["union (2)", isly.union(isly.number(), isly.string())],
		["or (2)", isly.number().or(isly.string())],
	] as const)("%s", (_, type) => {
		expect(type.is(13.37)).toEqual(true)
		expect(type.flawed({})).toEqual({
			name: "(number | string)",
			flaws: [
				{
					name: "number",
				},
				{
					name: "string",
				},
			],
		})
		expect(type.definition).toMatchObject({
			base: [
				{
					class: "number",
					name: "number",
				},
				{
					class: "string",
					name: "string",
				},
			],
			class: "union",
			name: "(number | string)",
		})
		expect(type.base[0]?.name).toBe("number")
		expect(type.base[1]?.definition).toEqual({ class: "string", name: "string" })
	})
	it("isly.boolean(), isly.number(), isly.string()", () => {
		const unionType = isly.union(isly.boolean(), isly.number(), isly.string())
		expect(unionType.is(13.37)).toEqual(true)
		expect(unionType.flawed({})).toEqual({
			name: "(boolean | number | string)",

			flaws: [
				{
					name: "boolean",
				},
				{
					name: "number",
				},
				{
					name: "string",
				},
			],
		})
	})
	it("union (6)", () => {
		const unionType = isly.union(
			isly.string("value", "a"),
			isly.string("value", "b"),
			isly.string("value", "c"),
			isly.string("value", "d"),
			isly.string("value", "e"),
			isly.string("value", "f")
		)
		expect(unionType.is("b")).toEqual(true)
		expect(unionType.is(13.37)).toEqual(false)
		expect(unionType.is(13.37)).toEqual(false)

		expect(unionType.flawed({})).toEqual({
			name: "('a' | 'b' | 'c' | 'd' | 'e' | 'f')",

			flaws: [
				{
					name: "'a'",
					condition: ["value: 'a'"],
				},
				{
					name: "'b'",
					condition: ["value: 'b'"],
				},
				{
					name: "'c'",
					condition: ["value: 'c'"],
				},
				{
					name: "'d'",
					condition: ["value: 'd'"],
				},
				{
					name: "'e'",
					condition: ["value: 'e'"],
				},
				{
					name: "'f'",
					condition: ["value: 'f'"],
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
		const letters = isly.union<Letters>(
			isly.string<A>("value", "A"),
			isly.string<B>("value", "B"),
			isly.string<C>("value", "C"),
			isly.string<D>("value", "D"),
			isly.string<E>("value", "E"),
			isly.string<F>("value", "F"),
			isly.string<G>("value", "G")
		)
		expect(letters.is("B")).toEqual(true)
		expect(letters.is(13.37)).toEqual(false)
		expect(letters.is(13.37)).toEqual(false)

		expect(letters.flawed({})).toEqual({
			name: "('A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G')",

			flaws: [
				{
					name: "'A'",
					condition: ["value: 'A'"],
				},
				{
					name: "'B'",
					condition: ["value: 'B'"],
				},
				{
					name: "'C'",
					condition: ["value: 'C'"],
				},
				{
					name: "'D'",
					condition: ["value: 'D'"],
				},
				{
					name: "'E'",
					condition: ["value: 'E'"],
				},
				{
					name: "'F'",
					condition: ["value: 'F'"],
				},
				{
					name: "'G'",
					condition: ["value: 'G'"],
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
		const userType = isly.object<User>({ email: isly.string() })
		const errorType = isly.object<Error>({ message: isly.string() })
		const unionType = isly.union(userType, errorType)
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
	it("should prune union of string", () => {
		type Country = "SE" | "FI" | "DE"
		const Country = isly.union<Country>(
			isly.string("value", "SE"),
			isly.string("value", "FI"),
			isly.string("value", "DE")
		)
		expect(Country.prune("SE")).toEqual("SE")
	})
})
