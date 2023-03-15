import "jest"
import { isly } from "./index"

describe("isly.named", () => {
	// TypeScript compile error if not working
	it("TypeScript narrowing", () => {
		const namedStringType = isly.named("myName", isly.string())
		const isNarrowingWorking: boolean | string | any = 0 as any
		if (namedStringType.is(isNarrowingWorking)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const myBoolean: string = isNarrowingWorking
		}
	})

	it("isly.named(number()", () => {
		const namedNumberType = isly.named("myName", isly.number())
		expect(namedNumberType.is(13.37)).toEqual(true)
		expect(namedNumberType.flaw({})).toEqual({ type: "myName" })
	})
})
