import "jest"
import { isly } from "./index"

describe("isly.Type", () => {
	// TypeScript compile error if not working
	it("TypeScript narrowing for .optional()", () => {
		const optionalStringType = isly.string().optional()
		const isNarrowingWorking: boolean | string | any = "garbage" as any
		if (optionalStringType.is(isNarrowingWorking)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const myOptionalString: undefined | string = isNarrowingWorking
		}
	})
	it("TypeScript narrowing for .readonly()", () => {
		type Item = { a: number }

		const readonlyItemType = isly.object<Item>({ a: isly.number() }).readonly()

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		function test(itemOrNumber: Readonly<Item> | number) {
			if (readonlyItemType.is(itemOrNumber)) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const myItem: Item = itemOrNumber
			} else {
				// This will not work if not readonly() is applied and working.
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const myNumber: number = itemOrNumber
			}
		}
	})
	it("string.optional()", () => {
		const optionalStringType = isly.string().optional()
		expect(optionalStringType.is("42")).toBeTruthy()
		expect(optionalStringType.is(undefined)).toBeTruthy()

		expect(optionalStringType.is({})).toBeFalsy()
		expect(optionalStringType.flaw(42)).toEqual({ type: "string | undefined" })
	})
})
