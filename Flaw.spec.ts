import "jest"
import * as isly from "./index"

describe("isly.Flaw", () => {
	// TypeScript compile error if not working
	it("TypeScript narrowing", () => {
		const isNarrowingWorking: boolean | string | any = true as any
		if (isly.Flaw.type.is(isNarrowingWorking)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const myFlaw: isly.Flaw = isNarrowingWorking
		}
	})
	it("is", () => {
		const objectType = isly.object({ number: isly.number() })
		const flaw = objectType.flaw(undefined)
		expect(isly.Flaw.type.is(flaw)).toBeTruthy()
		expect(isly.Flaw.type.flaw(flaw)).toBeUndefined()
	})
})
