import { isly } from "./index"

describe("isly.lazy", () => {
	// TypeScript compile error if not working
	it("TypeScript narrowing", () => {
		const lazyStringType = isly.lazy(() => isly.string())
		const isNarrowingWorking: boolean | string | any = true as any
		if (lazyStringType.is(isNarrowingWorking)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const myString: string = isNarrowingWorking
		}
	})
	it("generic", () => {
		const lazyStringType = isly.lazy(() => isly.string())

		expect(lazyStringType.is("42")).toBe(true)
		expect(lazyStringType.flaw(42)).toEqual({ type: "string" })
	})
	it("recursive", () => {
		//TODO
	})
})
