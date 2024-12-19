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
	it("Type.Value", () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const stringType = isly.string()
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const shouldBeString: isly.Type.Value<typeof stringType> = "This is a string"

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const numberType = isly.number()
		// @ts-expect-error This should fail, since trying to assign string to number.
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const shouldBeNumber: isly.Type.Value<typeof numberType> = "This is not a number"
	})
	it("string.optional()", () => {
		const optionalStringType = isly.string().optional()
		expect(optionalStringType.is("42")).toBe(true)
		expect(optionalStringType.is(undefined)).toBe(true)

		expect(optionalStringType.is({})).toBe(false)
		expect(optionalStringType.flaw(42)).toEqual({ type: "string | undefined" })
	})
	it("number.array()", () => {
		const arrayNumberType = isly.number().array()
		expect(arrayNumberType.is([42, 1337, 666])).toBe(true)
		expect(arrayNumberType.is(undefined)).toBe(false)
		expect(arrayNumberType.is(null)).toBe(false)

		expect(arrayNumberType.is({})).toBe(false)
		expect(arrayNumberType.flaw(42)).toEqual({ type: "number[]" })
	})
	it("number.array() with criteria", () => {
		const arrayNumberType = isly.number().array({ criteria: "length", value: 3 })
		expect(arrayNumberType.is([42, 1337, 666])).toBe(true)
		expect(arrayNumberType.is([42, 1337])).toBe(false)
		expect(arrayNumberType.is([42, 1337, 666, 123])).toBe(false)
		expect(arrayNumberType.is(undefined)).toBe(false)
		expect(arrayNumberType.is(null)).toBe(false)

		expect(arrayNumberType.is({})).toBe(false)
		expect(arrayNumberType.flaw(42)).toEqual({ type: "number[]", condition: "length == 3" })
	})
})
