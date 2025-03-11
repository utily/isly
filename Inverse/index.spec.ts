import { isly } from "../index"

describe("isly.Inverse", () => {
	const types = [
		isly.boolean().inverse().describe("Not true or false."),
		isly.boolean(true).inverse().describe("Not true."),
		isly.boolean(false).inverse("!false").describe("not false"),
	] as const
	it.each([
		["Inverse<boolean>", types[0]],
		["Inverse<true>", types[1]],
		["!false", types[2]],
	] as const)("name == %s", (expected, type) => expect(type.name).toBe(expected))
	it.each([
		["Not true or false.", types[0]],
		["Not true.", types[1]],
		["not false", types[2]],
	] as const)("description == %s", (expected, type) => expect(type.description).toBe(expected))
	it.each([
		[undefined, true],
		[null, true],
		[true, false],
		[false, false],
		[0, true],
		[1, true],
		["", true],
		["a", true],
		[{}, true],
		[[], true],
		[() => {}, true],
	])("is(%s) == %s", (value, expected) => expect(isly.boolean().inverse().is(value)).toBe(expected))
	it.each(types)("definition", type => expect(() => type.definition).toMatchSnapshot())
	it.each([
		[true, undefined],
		[false, undefined],
		[undefined, undefined],
		["invalid", "invalid"],
	])("get(%s) == %s", (value, expected) => expect(isly.boolean().inverse().get(value)).toBe(expected))
	it.each([
		[true, undefined],
		[false, undefined],
		[undefined, undefined],
		["invalid", "invalid"],
	])("extract(%s) == %s", (value, expected) => expect(isly.boolean().inverse().prune(value)).toBe(expected))
})
