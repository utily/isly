import { isly } from "../index"

describe("isly.boolean", () => {
	it("type narrowing", () => {
		// compile error if not working
		const isNarrowingWorking: boolean | string | any = "garbage" as any
		if (isly("boolean").is(isNarrowingWorking)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const myBoolean: boolean = isNarrowingWorking
		}
	})
	it.each([
		[true, true],
		[false, true],
		[0, false],
		["string", false],
		[null, false],
		[undefined, false],
		[{}, false],
		[[], false],
	])("is(%s) == %s", (input, expected) => expect(isly("boolean").is(input)).toBe(expected))
	it.each([
		[true, true],
		[false, false],
		[0, false],
	])("true: is(%s) == %s", (input, expected) => expect(isly("boolean", true).is(input)).toBe(expected))
	it.each([
		[false, true],
		[true, false],
		[0, false],
	])("false: is(%s) == %s", (input, expected) => expect(isly("boolean", false).is(input)).toBe(expected))
	// it("definition", () =>
	// 	expect(isly("boolean").definition).toEqual({ name: "boolean", description: "Value has to be true or false." }))
})
