import "jest"
import * as isly from "./index"

describe("isly.array", () => {
	// TypeScript compile error if not working
	it("TypeScript narrowing", () => {
		const arrayNumberType = isly.array(isly.number())
		// These are also working:
		// const arrayNumberType2 = isly.array<number[]>(isly.number())
		// const arrayNumberType3 = isly.array<number>(isly.number())

		const isNarrowingWorking: boolean | string | any = "garbage" as any
		if (arrayNumberType.is(isNarrowingWorking)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const myArray: number[] = isNarrowingWorking
		}
	})
	it("number[]", () => {
		const arrayType = isly.array(isly.number())
		expect(arrayType.is([])).toBeTruthy()
		expect(arrayType.is([1, 2, 3])).toBeTruthy()

		expect(arrayType.is(0)).toBeFalsy()

		expect(arrayType.flaw(42)).toEqual({ type: "number[]" })
		expect(arrayType.flaw([1, 2, undefined])).toEqual({
			type: "number[]",
			flaws: [
				{
					type: "number[2]",
				},
			],
		})
	})
	it("(number | string)[]", () => {
		const arrayType = isly.array(isly.union(isly.string(), isly.number()))
		expect(arrayType.flaw(undefined)).toEqual({
			type: "(string | number)[]",
		})
	})

	it("number[] with length criteria", () => {
		const arrayType = isly.array(isly.number(), { criteria: "length", value: 3 })
		expect(arrayType.is([3, 4, 5])).toBeTruthy()

		expect(arrayType.is([])).toBeFalsy()

		expect(arrayType.flaw(42)).toEqual({ type: "number[]", condition: "length == 3" })
		expect(arrayType.flaw([1, 2, undefined])).toEqual({
			type: "number[]",
			condition: "length == 3",
			flaws: [
				{
					type: "number[2]",
				},
			],
		})
		expect(arrayType.flaw([1, 2, 3, 4])).toEqual({
			type: "number[]",
			condition: "length == 3",
		})
	})
	it("number[] with minLength & maxLength criteria", () => {
		const arrayType = isly.array(
			isly.number(),
			{ criteria: "minLength", value: 1 },
			{ criteria: "maxLength", value: 3 }
		)
		expect(arrayType.is([3, 4, 5])).toBeTruthy()

		expect(arrayType.is([1, 2, 3, 4])).toBeFalsy()
		expect(arrayType.is([])).toBeFalsy()

		expect(arrayType.flaw(42)).toEqual({ type: "number[]", condition: "minLength == 1 & maxLength == 3" })
	})
})
