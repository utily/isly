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
	it("is allowed simple", () => {
		const type = isly("boolean", true)
		expect(type.is(false)).toBe(false)
	})
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
				.restrict(value => value == false, "true", "true")
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
	// it.each([
	// 	[isly("boolean"), { name: "boolean", description: "Value has to be true or false." }],
	// 	[
	// 		isly("boolean", true),
	// 		{ name: "true", description: "Value has to be true.", condition: ["equals true"], allowed: true },
	// 	],
	// 	[
	// 		isly("boolean", false),
	// 		{ name: "false", description: "Value has to be false.", condition: ["equals false"], allowed: false },
	// 	],
	// ] as const)("definition == %s", (type, expected) => expect(type.definition).toEqual(expected))
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
	])("extract(%s) == %s", (input, expected) => expect(isly("boolean").extract(input)).toBe(expected))
})
