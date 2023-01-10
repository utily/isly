import "jest"
import * as isly from "./index"

describe("lazy", () => {
	it("TypeScript narrowing", () => {
		const lazyStringType = isly.lazy(() => isly.string())

		// Test TypeScript Narrowing (compile error if not working)
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
