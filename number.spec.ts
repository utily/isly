import "jest"
import * as isly from "./index"

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
	it("isly.number().is.bind (Deprecated)", () => {
		const type = isly.number()
		const is = type.is.bind(type)
		expect(is(13.37)).toEqual(true)
		const flaw = type.flaw.bind(type)
		expect(flaw({})).toEqual({ type: "number" })
	})
	it("isly.number()", () => {
		const numberType = isly.number()
		expect(numberType.is(13.37)).toEqual(true)
		expect(numberType.name).toEqual("number")
		expect(numberType.flaw({})).toEqual({ type: "number" })
	})
	it('isly.number("positive")', () => {
		const numberType = isly.number("positive")
		expect(numberType.is(13.37)).toEqual(true)
		expect(numberType.is(-13.37)).toEqual(false)
		expect(numberType.flaw({})).toEqual({ type: "number", condition: "> 0" })
	})
	it('isly.number(["positive", "integer"])', () => {
		const numberType = isly.number(["positive", "integer"])
		expect(numberType.is(13)).toEqual(true)

		expect(numberType.is(-13)).toEqual(false)
		expect(numberType.is(13.37)).toEqual(false)
		expect(numberType.is(-13.37)).toEqual(false)

		expect(numberType.flaw({})).toEqual({ type: "number", condition: "> 0 & Number.isInteger" })
	})
})
