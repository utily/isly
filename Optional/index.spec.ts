import { creator as isly } from "../index"

describe("isly.Optional", () => {
	const types = [
		isly.boolean().optional(),
		isly.boolean(true).optional(),
		isly.boolean(false).optional("false?").describe("false or undefined"),
	] as const
	it("", () => {
		const t1 = isly.boolean().rename("t1")
		const t2 = t1.optional("not-required t1")
		expect(t2.name).toBe("not-required t1")
		expect(t2.base.is(undefined)).toBe(false)
		const v2: any = "test"
		if (t2.base.is(v2))
			expect(v2).toBe(true)
	})
	it.each([
		["boolean | undefined", types[0]],
		["true | undefined", types[1]],
		["false?", types[2]],
	] as const)("name == %s", (expected, type) => expect(type.name).toBe(expected))
	it.each([
		["Value is optional i.e. undefined or base type.", types[0]],
		["Value is optional i.e. undefined or base type.", types[1]],
		["false or undefined", types[2]],
	] as const)("description == %s", (expected, type) => expect(type.description).toBe(expected))
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
	])("is(%s) == %s", (value, expected) => expect(isly.boolean().optional().is(value)).toBe(expected))
	it.each(types)("definition", type => expect(() => type.definition).toMatchSnapshot())
	it.each([
		[true, true],
		[false, false],
		[undefined, undefined],
		["invalid", undefined],
	])("get(%s) == %s", (value, expected) => expect(isly.boolean().optional().get(value)).toBe(expected))
	it.each([
		[true, true],
		[false, false],
		[undefined, undefined],
		["invalid", undefined],
	])("extract(%s) == %s", (value, expected) => expect(isly.boolean().optional().prune(value)).toBe(expected))
})
