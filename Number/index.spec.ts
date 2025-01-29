import { isly } from "../index"

describe("isly.number", () => {
	// TypeScript compile error if not working
	it("TypeScript narrowing", () => {
		const numberType = isly("number")
		const isNarrowingWorking: boolean | string | any = "garbage" as any
		if (numberType.is(isNarrowingWorking)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const myNumber: number = isNarrowingWorking
		}
	})
	it(`isly("number").is.bind (Deprecated)`, () => {
		// This was needed before functions where implemented with closures.
		const type = isly("number")
		const is = type.is.bind(type)
		expect(is(13.37)).toEqual(true)
		// const flaw = type.flaw.bind(type)
		// expect(flaw({})).toEqual({ type: "number" })
	})
	it.each([
		[13.37, true],
		[NaN, false],
		[Infinity, false],
		[-Infinity, false],
	])('isly("number").is(%d) == %s', (input, expected) => expect(isly("number").is(input)).toEqual(expected))

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
	])('isly("number").get(%p)', (input, expected) => expect(isly("number").get(input)).toEqual(expected))

	it('isly("number").name', () => expect(isly("number").name).toEqual("number"))
	// it('isly("number").flaw({})', () =>
	// 	expect(numberType.flaw({})).toEqual({ type: "number" })
	// )
	it('isly.number("positive")', () => {
		const numberType = isly("number", "positive")
		expect(numberType.is(13.37)).toEqual(true)
		expect(numberType.is(-13.37)).toEqual(false)
		// expect(numberType.flaw({})).toEqual({ type: "number", condition: "> 0" })
	})
	it('isly.number().restrict("positive")', () => {
		const { verify, description } = isly.Number.Condition.getVerifier("positive")
		const type = isly("number").restrict(verify, "positive")
		const d = type.describe(description)
		expect(type.is(13.37)).toEqual(true)
		expect(type.is(-13.37)).toEqual(false)
		expect(d.is(13.37)).toEqual(true)
		expect(d.is(-13.37)).toEqual(false)
		// expect(numberType.flaw({})).toEqual({ type: "number", condition: "> 0" })
	})
	// it('isly.number(["positive", "integer"])', () => {
	// 	const numberType = isly("number", "positive").restrict("integer")
	// 	expect(numberType.is(13)).toEqual(true)

	// 	expect(numberType.is(-13)).toEqual(false)
	// 	expect(numberType.is(13.37)).toEqual(false)
	// 	expect(numberType.is(-13.37)).toEqual(false)

	// 	// expect(numberType.flaw({})).toEqual({ type: "number", condition: "> 0 & Number.isInteger" })
	// })
	it("isly.number([1, 2, 3]).is(2)", () => expect(isly("number", "value", [1, 2, 3]).is(2)).toEqual(true))
	it("isly.number([1, 2, 3]).is(0)", () => expect(isly("number", "value", [1, 2, 3]).is(0)).toEqual(false))
	it("isly.number<1, 2, 3>([1, 2, 3] as const).is(2)", () =>
		expect(isly<1 | 2 | 3>("number", "value", [1, 2, 3] as const).is(2)).toEqual(true))
})
