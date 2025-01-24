import { isly } from "../index"

describe("isly.Optional", () => {
	it("should return the correct value for get(%p)", () => {
		const t1 = isly("boolean")
		const t2 = t1.optional()
		expect(t2.name).toBe("boolean | undefined")
	})
	it("should return the correct value for get(%p)", () => {
		const t1 = isly("boolean").rename("t1")
		const t2 = t1.optional("not-required t1")
		expect(t2.name).toBe("not-required t1")
		expect(t2.base.is(undefined)).toBe(false)
		const v2: any = true
		if (t2.base.is(v2))
			expect(v2).toBe(true)
	})
	it.each([
		[undefined, true],
		[null, false],
		[true, true],
		[false, true],
		[0, false],
		[1, false],
		["", false],
		["a", false],
		[{}, false],
		[[], false],
		[() => {}, false],
	])("is(%s) == %s", (value, expected) => expect(isly("boolean").optional().is(value)).toBe(expected))
})
