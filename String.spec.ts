import "jest"
import * as isly from "./index"

describe("Strings", () => {
	it("generic", () => {
		expect(isly.string().is("42")).toBeTruthy()
		expect(isly.string().flaw(42)).toEqual({ type: "string" })
	})
	it("literal", () => {
		expect(isly.string("42").is("42")).toBeTruthy()
		expect(isly.string("42").is("43")).toBeFalsy()
		expect(isly.string("42", "43").is("43")).toBeTruthy()
		expect(isly.string("42").flaw(42)).toEqual({ type: "string" })
	})
})
