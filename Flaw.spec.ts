import { isly } from "./index"

describe("isly.Flaw", () => {
	// TypeScript compile error if not working
	it("TypeScript narrowing", () => {
		const isNarrowingWorking: boolean | string | any = true as any
		if (isly.Flaw.is(isNarrowingWorking)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const myFlaw: isly.Flaw = isNarrowingWorking
		}
	})
	it("is", () => {
		const objectType = isly.object({ number: isly.number() })
		const flaw = objectType.flaw(undefined)
		expect(isly.Flaw.is(flaw)).toBe(true)
		expect(isly.Flaw.type.is(flaw)).toBe(true)
		expect(isly.Flaw.flaw(flaw)).toEqual({ isFlaw: false, message: "This type is correct.", type: "Flaw" })
	})
})
