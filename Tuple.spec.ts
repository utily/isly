import "jest"
import * as isly from "./index"

describe("Tuple", () => {
	it("[string, string]", () => {
		const tuple = isly.tuple(isly.string(), isly.string())
		expect(tuple.is([])).toBeFalsy()
		expect(tuple.is(["foo", "bar"])).toBeTruthy()
	})
})
