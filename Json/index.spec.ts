import { isly } from "../index"

describe("typedly.Json", () => {
	interface A {
		x: number
		y: number
	}
	const a: A = {
		x: 42,
		y: 13.37,
	}
	const stringified = {
		plain: '{"x":42,"y":13.37}',
		formatted: '{\n\t"x": 42,\n\t"y": 13.37\n}',
	}
	it.each([
		[stringified.plain, a],
		[stringified.formatted, a],
		[stringified.plain.substring(1), undefined],
	])("parse %s", (data, expected) => expect(isly.Json.parse(data)).toEqual(expected))
	it.each([
		[{ alpha: 42 }, `{"alpha":42}`],
		[a, stringified.plain],
	])("stringify %s", (data, expected) => expect(isly.Json.stringify(data)).toEqual(expected))
	it("create & stringify", () =>
		expect(isly.Json.create().stringify({ alpha: 42 })).toMatchInlineSnapshot(`"{"alpha":42}"`))
	it("stringify pretty", () =>
		expect(isly.Json.create({ space: "\t" }).stringify({ alpha: 42 })).toMatchInlineSnapshot(`
"{
	"alpha": 42
}"
`))
	it.each([
		[{}, "{}"],
		["", '""'],
		[0, "0"],
		[undefined, undefined],
		[null, "null"],
		[{ 0: false }, '{"0":false}'],
		[false, "false"],
		[{ [Symbol.toStringTag]: "string" }, "{}"],
		[new ArrayBuffer(1024) as any, "{}"],
	])("stringify %s", (data, expected) => expect(isly.Json.stringify(data)).toEqual(expected))
	it("narrowed type", () => {
		expect(isly.Json.stringify(a)).toEqual(stringified.plain)
	})
	it("untyped w/ options", () => {
		const json = isly.Json.create({ space: "\t" })
		expect(json.stringify(a as any)).toEqual(stringified.formatted)
		expect(json.parse(stringified.plain)).toEqual(a)
	})
	it("typed w/o options", () => {
		const json = isly.Json.create(isly.object<A>({ x: isly.number(), y: isly.number() }))
		expect(json.stringify(a)).toEqual(stringified.plain)
		const newA: A | undefined = json.parse(stringified.plain)
		expect(newA).toEqual(a)
	})
})
