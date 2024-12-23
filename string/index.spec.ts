import { isly } from "../index"

describe("isly.string", () => {
	// TypeScript compile error if not working
	it("TypeScript narrowing", () => {
		{
			const stringType = isly.string()
			const isNarrowingWorking: boolean | string | any = true as any
			if (stringType.is(isNarrowingWorking)) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const myString: string = isNarrowingWorking
			}
		}
		{
			const stringType = isly.string("A")
			const isNarrowingWorking: boolean | string | any = true as any
			if (stringType.is(isNarrowingWorking)) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const myString: "A" = isNarrowingWorking
			}
		}
		{
			const stringType = isly.string(["A", "B"])
			const isNarrowingWorking: boolean | string | any = true as any
			if (stringType.is(isNarrowingWorking)) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const myString: "A" | "B" = isNarrowingWorking
			}
		}
		{
			const stringType = isly.string({ A: true, B: true })
			const isNarrowingWorking: boolean | string | any = true as any
			if (stringType.is(isNarrowingWorking)) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const myString: "A" | "B" = isNarrowingWorking
			}
		}
	})
	it("generic", () => {
		expect(isly.string().is("42")).toBe(true)
		expect(isly.string().flaw(42)).toEqual({ type: "string" })
	})
	it("literal", () => {
		expect(isly.string(["42", "43"]).is("43")).toBe(true)

		const string42Type = isly.string("42")

		expect(string42Type.is("42")).toBe(true)
		expect(string42Type.is("43")).toBe(false)
		expect(string42Type.is("")).toBe(false)
		expect(string42Type.flaw(42)).toEqual({ type: '"42"', condition: '"42"' })
		expect(isly.string(["42", "43"]).flaw("44")).toEqual({ type: "string", condition: '"42" | "43"' })
	})
	it("regexp-simple", () => {
		const stringRegexpType = isly.string(/^'.*'$/)
		expect(stringRegexpType.is("'42'")).toBe(true)
		expect(stringRegexpType.is("42")).toBe(false)

		expect(stringRegexpType.flaw(42)).toEqual({ type: "string", condition: "/^'.*'$/" })
	})

	it("regexp-selector", () => {
		const stringRegexpType = isly.string(/^((^|(?<!^)\.)[a-zA-Z]\w*|(\[\d+\]))*$/)

		expect(stringRegexpType.is("created")).toBe(true)
		expect(stringRegexpType.is("created")).toBe(true)
		expect(stringRegexpType.is("prop.subProp")).toBe(true)
		expect(stringRegexpType.is("prop[1]")).toBe(true)
		expect(stringRegexpType.is("prop[1]")).toBe(true)
		expect(stringRegexpType.is("[12][45]")).toBe(true)
		expect(stringRegexpType.is(".42")).toBe(false)
	})
	it("predicate", () => {
		const type = isly.string(v => v.length == 5)
		expect(type.is("13.37")).toBe(true)
		expect(type.is("42")).toBe(false)
		expect(type.flaw("42")).toEqual({ type: "string", condition: "custom-predicate" })
		expect(isly.string(v => v.length == 5, "length 5").flaw("42")).toEqual({
			type: "string",
			condition: "length 5",
		})
	})
})
