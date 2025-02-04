import { isly } from "../index"

describe('isly("from")', () => {
	type Specific = "Specific"
	const specificIsFunction = (value: any): value is "Specific" => value == "Specific"

	// compile error if not working
	it("type narrowing, without generic", () => {
		const value: boolean | string | any = "garbage" as any
		if (isly("from", "test", specificIsFunction)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const data: Specific = value
		}
	})
	// compile error if not working
	it("type narrowing, with generic", () => {
		const value: boolean | string | any = "garbage" as any
		if (isly<Specific>("from", "test", (value: Specific | any): value is Specific => value == "Specific").is(value)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const data: Specific = value
		}
	})
	it("Specific", () => {
		const customType = isly("from", "myName", specificIsFunction)
		expect(customType.is("Specific")).toEqual(true)
		expect(customType.is(13.37)).toEqual(false)
		expect(customType.flawed({})).toEqual({ name: "myName", description: "Value has to fulfill custom predicate." })
	})
	it("Specific[]", () => {
		const customType = isly("array", isly("from", "myName", specificIsFunction))
		expect(customType.is([])).toEqual(true)
		expect(customType.is(["Specific", "Specific"])).toEqual(true)

		expect(customType.is(["Specific", 0, "Specific"])).toEqual(false)
		expect(customType.is("Specific")).toEqual(false)
		expect(customType.is(13.37)).toEqual(false)
		expect(customType.flawed({})).toEqual({
			name: "myName[]",
			description: "Array of myName[].",
			flaws: [
				{
					name: "myName",
					description: "Value has to fulfill custom predicate.",
				},
			],
		})
	})
	it("Specific.array()", () => {
		const customType = isly("from", "myName", specificIsFunction).array()
		expect(customType.is([])).toEqual(true)
		expect(customType.is(["Specific", "Specific"])).toEqual(true)

		expect(customType.is(["Specific", 0, "Specific"])).toEqual(false)
		expect(customType.is("Specific")).toEqual(false)
		expect(customType.is(13.37)).toEqual(false)
		expect(customType.flawed({})).toEqual({ type: "myName[]" })
	})
	it("class", () => {
		class A {
			ab = 1 as const
		}
		class B {
			ab = 1 as const
		}
		const a = new A()
		const b = new B()

		const typeA = isly<A>("from", "A", value => value instanceof A)
		const typeB = isly<B>("from", "B", value => value instanceof B)

		expect(typeA.is(a)).toEqual(true)
		expect(typeA.is(b)).toEqual(false)

		expect(typeB.is(b)).toEqual(true)
		expect(typeB.is(a)).toEqual(false)

		expect(typeA.flawed(undefined)).toEqual({ name: "A", description: "Value has to fulfill custom predicate." })
	})
	it("class, inherited", () => {
		class A {
			ab = 1 as const
		}
		class B extends A {}
		const a = new A()
		const b = new B()

		const typeA = isly<A>("from", "A", value => value instanceof A)
		const typeB = isly<B>("from", "B", value => value instanceof B)

		expect(typeA.is(a)).toEqual(true)
		expect(typeA.is(b)).toEqual(true)

		expect(typeB.is(b)).toEqual(true)
		expect(typeB.is(a)).toEqual(false)

		expect(typeB.flawed(undefined)).toEqual({ name: "B", description: "Value has to fulfill custom predicate." })
	})
})
