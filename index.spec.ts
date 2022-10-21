import "jest"
import * as isly from "./index"

describe("isly", () => {
	it("is", () => {
		expect(new isly.String().is("42")).toEqual(true)
	})
})
