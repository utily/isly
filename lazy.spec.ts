import "jest"
import * as isly from "./index"

describe("lazy", () => {
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

		expect(lazyStringType.is("42")).toBeTruthy()
		expect(lazyStringType.flaw(42)).toEqual({ type: "string" })
	})
	it("recursive", () => {
		//TODO
	})
})
