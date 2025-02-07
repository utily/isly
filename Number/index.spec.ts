import { creator as isly } from "../index"

describe("isly.number", () => {
	// TypeScript compile error if not working
	it("TypeScript narrowing", () => {
		const numberType = isly.number()
		const isNarrowingWorking: boolean | string | any = "garbage" as any
		if (numberType.is(isNarrowingWorking)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const myNumber: number = isNarrowingWorking
		}
	})
	it(`isly.number().is`, () => {
		// This was needed before functions where implemented with closures.
		const type = isly.number()
		expect(type.is(13.37)).toBe(true)
		expect(type.flawed({})).toEqual({ name: "number", description: "Any finite numeric value." })
		const is = type.is.bind(type)
		expect(is(13.37)).toBe(true)
		const flawed = type.flawed.bind(type)
		expect(flawed({})).toEqual({ name: "number", description: "Any finite numeric value." })
	})
	it.each([
		[13.37, true],
		[NaN, false],
		[Infinity, false],
		[-Infinity, false],
	])("isly.number().is(%d) == %s", (input, expected) => expect(isly.number().is(input)).toEqual(expected))

	it.each([
		[0, 0],
		[42, 42],
		[NaN, undefined],
		[[], undefined],
		[null, undefined],
		[{}, undefined],
		["", undefined],
		[undefined, undefined],
		[false, undefined],
		[Infinity, undefined],
		[-Infinity, undefined],
	])("isly.number().get(%p)", (input, expected) => expect(isly.number().get(input)).toEqual(expected))

	it("isly.number().name", () => expect(isly.number().name).toEqual("number"))
	it("isly.number().flaw({})", () =>
		expect(isly.number().flawed({})).toEqual({ name: "number", description: "Any finite numeric value." }))
	it('isly.number("positive")', () => {
		const type = isly.number("positive")
		expect(type.is(13.37)).toEqual(true)
		expect(type.is(-13.37)).toEqual(false)
		expect(type.flawed({})).toEqual({
			name: "number",
			condition: ["positive"],
			description: "Any finite numeric value.",
		})
	})
	it('isly.number().restrict("positive()', () => {
		const type = isly.number("positive")
		expect(type.is(13.37)).toEqual(true)
		expect(type.is(-13.37)).toEqual(false)
		expect(type.flawed({})).toEqual({
			name: "number",
			condition: ["positive"],
			description: "Any finite numeric value.",
		})
	})
	it('isly.number", "positive().restrict("integer"])', () => {
		const numberType = isly.number("positive").restrict("integer")
		expect(numberType.is(13)).toEqual(true)
		expect(numberType.is(-13)).toEqual(false)
		expect(numberType.is(13.37)).toEqual(false)
		expect(numberType.is(-13.37)).toEqual(false)
		expect(numberType.flawed({})).toEqual({
			name: "number",
			condition: ["positive", "integer"],
			description: "Any finite numeric value.",
		})
	})
	it('isly.number("value", [1, 2, 3]).is(2) == true', () => expect(isly.number("value", [1, 2, 3]).is(2)).toEqual(true))
	it('isly.number("value", [1, 2, 3]).is(0) == false', () =>
		expect(isly.number("value", [1, 2, 3]).is(0)).toEqual(false))
	it('isly.number", "value<1 | 2 | 3>([1, 2, 3] as const).is(2) == true', () =>
		expect(isly.number<1 | 2 | 3>("value", [1, 2, 3] as const).is(2)).toEqual(true))
})
