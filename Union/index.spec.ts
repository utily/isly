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
			type: "number | string",
			flaws: [
				{
					type: "number",
				},
				{
					type: "string",
				},
			],
		})
	})
	it("union (3)", () => {
		const unionType = isly("union", isly("boolean"), isly("number"), isly("string"))
		expect(unionType.is(13.37)).toEqual(true)
		expect(unionType.flawed({})).toEqual({
			type: "boolean | number | string",
			flaws: [
				{
					type: "boolean",
				},
				{
					type: "number",
				},
				{
					type: "string",
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
			type: '"a" | "b" | "c" | "d" | "e" | "f"',
			flaws: [
				{
					type: '"a"',
					condition: '"a"',
				},
				{
					type: '"b"',
					condition: '"b"',
				},
				{
					type: '"c"',
					condition: '"c"',
				},
				{
					type: '"d"',
					condition: '"d"',
				},
				{
					type: '"e"',
					condition: '"e"',
				},
				{
					type: '"f"',
					condition: '"f"',
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
			flaws: [
				{
					condition: '"A"',
					type: '"A"',
				},
				{
					condition: '"B"',
					type: '"B"',
				},
				{
					condition: '"C"',
					type: '"C"',
				},
				{
					condition: '"D"',
					type: '"D"',
				},
				{
					condition: '"E"',
					type: '"E"',
				},
				{
					condition: '"F"',
					type: '"F"',
				},
				{
					condition: '"G"',
					type: '"G"',
				},
			],
			type: '"A" | "B" | "C" | "D" | "E" | "F" | "G"',
		})
	})
	it("union.get", () => {
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
		const testData: MyUnion[] = [userWithPassword, { message: "Failed" }]
		testData.forEach(data => {
			const pureValue = unionType.get(data)
			expect(pureValue).not.toBeFalsy()
			if (pureValue) {
				expect(data).toMatchObject(pureValue)
				expect(pureValue).not.toHaveProperty("password")
			}
		})
	})
})
