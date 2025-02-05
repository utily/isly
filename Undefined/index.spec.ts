import { isly } from "../index"

describe('isly("undefined")', () => {
	it("type narrowing", () => {
		// compilation error if not working
		const value = "garbage" as unknown
		if (isly("undefined").is(value)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const data: undefined = value
		}
	})
	it.each([
		[undefined, true],
		[42, false],
		[null, false],
	])("is(%s) == %s", (input, expected) => expect(isly("undefined").is(input)).toEqual(expected))
	it.each([
		["42", undefined],
		[undefined, undefined],
	])("get(%s)", (input, expected) => expect(isly("undefined").get(input)).toEqual(expected))
	it.each([
		[undefined, undefined],
		[42, undefined],
		[null, undefined],
	])("extract %s", (input, expected) => expect(isly("undefined").prune(input)).toEqual(expected))
	it("definition", () =>
		expect(isly("undefined").definition).toEqual({
			name: "undefined",
			description: "Value has to be undefined.",
		}))
})
