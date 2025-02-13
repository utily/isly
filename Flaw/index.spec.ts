import { isly } from "../index"

describe("isly.Flaw", () => {
	it("is", () => {
		const flaw = isly.string().flawed({})
		expect(flaw).toEqual({ name: "string" })
		expect(isly.Flaw.is(flaw)).toBe(true)
	})
})
