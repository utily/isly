import { isly } from "./index"

describe("isly.union", () => {
	// TypeScript compile error if not working
	it("TypeScript narrowing", () => {
		const testTupleType = isly.union(isly.string(), isly.number())
		const isNarrowingWorking: boolean | string | any = "garbage" as any
		if (testTupleType.is(isNarrowingWorking)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const myTestTuple: string | number = isNarrowingWorking
		}
	})
	it("union (2)", () => {
		const unionType = isly.union(isly.number(), isly.string())
		expect(unionType.is(13.37)).toEqual(true)
		expect(unionType.flaw({})).toEqual({
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
		const unionType = isly.union(isly.boolean(), isly.number(), isly.string())
		expect(unionType.is(13.37)).toEqual(true)
		expect(unionType.flaw({})).toEqual({
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
		const unionType = isly.union(
			isly.string("a"),
			isly.string("b"),
			isly.string("c"),
			isly.string("d"),
			isly.string("e"),
			isly.string("f")
		)
		expect(unionType.is("b")).toEqual(true)
		expect(unionType.is(13.37)).toEqual(false)
		expect(unionType.is(13.37)).toEqual(false)

		expect(unionType.flaw({})).toEqual({
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
		const Letters = isly.union<Letters>(
			isly.string<A>("A"),
			isly.string<B>("B"),
			isly.string<C>("C"),
			isly.string<D>("D"),
			isly.string<E>("E"),
			isly.string<F>("F"),
			isly.string<G>("G")
		)
		expect(Letters.is("B")).toEqual(true)
		expect(Letters.is(13.37)).toEqual(false)
		expect(Letters.is(13.37)).toEqual(false)

		expect(Letters.flaw({})).toEqual({
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
		const userType = isly.object<User>({ email: isly.string() })
		const errorType = isly.object<Error>({ message: isly.string() })
		const unionType = isly.union(userType, errorType)
		const userWithPassord: User & { password: string } = {
			email: `test@example.com`,
			password: "shouldBeSecret",
		}
		const testData: MyUnion[] = [userWithPassord, { message: "Failed" }]
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
