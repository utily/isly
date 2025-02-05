import { isly } from "../index"

describe("isly.boolean", () => {
	it("type narrowing", () => {
		// compile error if not working
		const isNarrowingWorking: boolean | string | any = "garbage" as any
		if (isly("boolean").is(isNarrowingWorking)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const myBoolean: boolean = isNarrowingWorking
		}
	})
	it("restrict & describe", () => {
		const t1 = isly("boolean")
		expect(t1.is(false)).toBe(true)
		expect(t1.description).toBe("Value has to be true or false.")
		const t2 = t1.describe("Any boolean value.")
		expect(t2.description).toBe("Any boolean value.")
		expect(t2.is(false)).toBe(true)
		const t3 = t2.describe("true | false")
		expect(t3.description).toBe("true | false")
		expect(t3.is(false)).toBe(true)
		const t4 = t3.restrict(value => value == true, "true", "true")
		expect(t4.is(true)).toBe(true)
		expect(t4.is(false)).toBe(false)
		expect(t4.condition).toEqual(["true"])
		expect(t4.name).toBe("true")
		const t5 = t4.describe("only true")
		expect(t5.description).toBe("only true")
		expect(t5.is(true)).toBe(true)
		expect(t5.is(false)).toBe(false)
		expect(t5.condition).toEqual(["true"])
		expect(t5.name).toBe("true")
	})
	it("modify", () => {
		const t1 = isly("boolean")
		expect(t1.is(false)).toBe(true)
		expect(t1.description).toBe("Value has to be true or false.")
		const t2 = t1.modify({ description: "Any boolean value." })
		expect(t2.description).toBe("Any boolean value.")
		expect(t2.is(false)).toBe(true)
	})
	it.each([
		[true, "true"],
		[false, "false"],
		[undefined, "boolean"],
	])('isly("boolean", %s).name == %s', (allowed, expected) => expect(isly("boolean", allowed).name).toBe(expected))
	it.each([
		[true, true],
		[false, true],
		[0, false],
		["string", false],
		[null, false],
		[undefined, false],
		[{}, false],
		[[], false],
	])("is(%s) == %s", (input, expected) => expect(isly("boolean").is(input)).toBe(expected))
	it.each([
		[true, true],
		[false, false],
		[0, false],
	])("true: is(%s) == %s", (input, expected) =>
		expect(
			isly("boolean")
				.restrict(value => value == true, "true", "true")
				.is(input)
		).toBe(expected)
	)
	it.each([
		[false, true],
		[true, false],
		[0, false],
	])("false: is(%s) == %s", (input, expected) =>
		expect(
			isly("boolean")
				.restrict(value => value == false, "false", "false")
				.is(input)
		).toBe(expected)
	)
	it.each([
		[isly("boolean"), { name: "boolean", description: "Value has to be true or false." }],
		[
			isly("boolean", true),
			{ name: "true", description: "Value has to be true.", condition: ["value: true"], allowed: true },
		],
		[
			isly("boolean", false),
			{ name: "false", description: "Value has to be false.", condition: ["value: false"], allowed: false },
		],
	] as const)("definition == %s", (type, expected) => expect(type.definition).toEqual(expected))
	it.each([
		[true, true],
		[false, false],
		[0, undefined],
		["string", undefined],
		[null, undefined],
		[undefined, undefined],
		[{}, undefined],
		[[], undefined],
	])("get(%s) == %s", (input, expected) => expect(isly("boolean").get(input)).toBe(expected))
	it.each([
		[true, true],
		[false, false],
		[0, undefined],
		["string", undefined],
		[null, undefined],
		[undefined, undefined],
		[{}, undefined],
		[[], undefined],
	])("extract(%s) == %s", (input, expected) => expect(isly("boolean").prune(input)).toBe(expected))
})
