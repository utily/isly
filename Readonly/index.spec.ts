import { isly } from "../index"

describe("isly.Readonly", () => {
	it.each([
		[{ a: 1 }, true, isly.object({ a: isly.number() })],
		[{ b: "test" }, true, isly.object({ b: isly.string() })],
		[{ c: true }, true, isly.object({ c: isly.boolean() })],
		[{ d: null }, true, isly.object({ d: isly.null() })],
		[{ e: undefined }, true, isly.object({ e: isly.undefined() })],
		[{ f: { nested: "value" } }, true, isly.object({ f: isly.object({ nested: isly.string() }) })],
		[null, true, isly.null()],
		[undefined, true, isly.undefined()],
		[123, true, isly.number()],
		["string", true, isly.string()],
		[true, true, isly.boolean()],
		[false, true, isly.boolean()],
		[[], true, isly.array(isly.number())],
		[() => {}, true, isly.function()],
	] as const)("should validate %s as %s", (value, expected, base) => {
		expect(isly.readonly(base).is(value)).toBe(expected)
	})
})
