import { isly } from "../index"

describe("isly.string", () => {
	// TypeScript compile error if not working
	it("type narrowing isly.string()", () => {
		const type = isly.string()
		const value: boolean | string | any = true as any
		if (type.is(value)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const data: string = value
		}
	})
	it('type narrowing isly.string("value", "A")', () => {
		const type = isly.string("value", "A")
		const value: boolean | string | any = true as any
		if (type.is(value)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const data: "A" = value
		}
	})
	it('type narrowing isly.string("value", "A", "B()', () => {
		const type = isly.string("value", "A", "B")
		const value: boolean | string | any = true as any
		if (type.is(value)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const data: "A" | "B" = value
		}
	})
	it("generic", () => {
		expect(isly.string().is("42")).toBe(true)
		expect(isly.string().flawed(42)).toEqual({ name: "string", description: "A string value." })
	})
	it("literal", () => {
		expect(isly.string("value", ["42", "43"]).is("43")).toBe(true)
		const type = isly.string("value", "42")
		expect(type.is("42")).toBe(true)
		expect(type.is("43")).toBe(false)
		expect(type.is("")).toBe(false)
		expect(type.flawed(42)).toEqual({ name: "'42'", condition: ["value: '42'"], description: "One of: 42." })
		expect(isly.string("value", ["42", "43"]).flawed("44")).toEqual({
			name: "('42' | '43')",
			condition: ["value: ['42', '43']"],
			description: "One of: 42, 43.",
		})
	})
	it("regexp-simple", () => {
		const type = isly.string("value", /^'.*'$/)
		expect(type.is("'42'")).toBe(true)
		expect(type.is("42")).toBe(false)
		expect(type.flawed(42)).toEqual({ name: "string", condition: ["value: /^'.*'$/"], description: "A string value." })
	})
	it("regexp-selector", () => {
		const type = isly.string("value", /^((^|(?<!^)\.)[a-zA-Z]\w*|(\[\d+\]))*$/)
		expect(type.is("created")).toBe(true)
		expect(type.is("created")).toBe(true)
		expect(type.is("prop.subProp")).toBe(true)
		expect(type.is("prop[1]")).toBe(true)
		expect(type.is("prop[1]")).toBe(true)
		expect(type.is("[12][45]")).toBe(true)
		expect(type.is(".42")).toBe(false)
	})
	it("predicate", () => {
		const type = isly.string().restrict(v => v.length == 5, "length: 5")
		expect(type.is("13.37")).toBe(true)
		expect(type.is("42")).toBe(false)
		expect(type.flawed("42")).toEqual({ name: "string", condition: ["length: 5"], description: "A string value." })
		expect(isly.string("length", "value", 5).flawed("42")).toEqual({
			name: "string",
			condition: ["length.value: 5"],
			description: "A string value.",
		})
	})
	it.each([
		["hello", "hello"],
		["world", "world"],
		["", ""],
	] as const)("isly.string().serialize(%s) == %s", (input, expected) =>
		expect(isly.string().serialize(input)).toEqual(expected)
	)
	it.each([
		["hello", "hello"],
		["world", "world"],
		["", ""],
	] as const)("isly.string().parse(%s) == %s", (input, expected) =>
		expect(isly.string().parse(input)).toEqual(expected)
	)
})
