import "jest"
import * as isly from "./index"

describe("string", () => {
	// TypeScript compile error if not working
	it("TypeScript narrowing", () => {
		const stringType = isly.string()
		const isNarrowingWorking: boolean | string | any = true as any
		if (stringType.is(isNarrowingWorking)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const myString: string = isNarrowingWorking
		}
	})
	it("generic", () => {
		expect(isly.string().is("42")).toBeTruthy()
		expect(isly.string().flaw(42)).toEqual({ type: "string" })
	})
	it("literal", () => {
		expect(isly.string("42", "43").is("43")).toBeTruthy()
		expect(isly.string(...["42", "43"]).is("43")).toBeTruthy()

		const string42Type = isly.string("42")

		expect(string42Type.is("42")).toBeTruthy()
		expect(string42Type.is("43")).toBeFalsy()
		expect(string42Type.is("")).toBeFalsy()
		expect(string42Type.flaw(42)).toEqual({ type: "string", condition: '"42"' })
		expect(isly.string(...["42", "43"]).flaw("44")).toEqual({ type: "string", condition: '"42" | "43"' })
	})
	it("regexp", () => {
		const stringRegexpType = isly.string(/^'.*'$/)
		expect(stringRegexpType.is("'42'")).toBeTruthy()
		expect(stringRegexpType.is("42")).toBeFalsy()

		expect(stringRegexpType.flaw(42)).toEqual({ type: "string", condition: "/^'.*'$/" })

		expect(isly.string(/^aaa$/i, /^BBB$/).flaw(undefined)).toEqual({ type: "string", condition: "/^aaa$/i | /^BBB$/" })
	})
})
