import { isly } from "./index"

describe("isly lazy", () => {
	// compile error if not working
	it("type narrowing", () => {
		const value: boolean | string | any = true as any
		if (isly.lazy(() => isly.string()).is(value)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const data: string = value
		}
	})
	it("generic", () => {
		const type = isly.lazy(() => isly.string())
		expect(type.is("42")).toBe(true)
		expect(type.flawed(42)).toEqual({ name: "string", description: "A string value." })
	})
	it("recursive", () => {
		//TODO
	})
})
