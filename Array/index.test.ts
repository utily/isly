import { isly } from "../index"

describe("isly.Array", () => {
	// TypeScript compile error if not working
	it("TypeScript narrowing", () => {
		const arrayNumberType = isly("number").array()
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
		const arrayType = isly("array", isly("number"))
		expect(arrayType.is([])).toBe(true)
		expect(arrayType.is([1, 2, 3])).toBe(true)

		expect(arrayType.is(0)).toBe(false)

		// 	expect(arrayType.flaw(42)).toEqual({ type: "number[]" })
		// 	expect(arrayType.flaw([1, 2, undefined])).toEqual({
		// 		type: "number[]",
		// 		flaws: [
		// 			{
		// 				type: "number[2]",
		// 			},
		// 		],
		// 	})
	})
	it("(number | string)[]", () => {
		// const arrayType = isly("union", isly("string"), isly("number")).array()
		// expect(arrayType.flaw(undefined)).toEqual({
		// 	type: "(string | number)[]",
		// })
	})

	it("number[] with length criteria", () => {
		const arrayType = isly("number").array().restrict("length", "value", 3)
		expect(arrayType.is([3, 4, 5])).toBe(true)

		expect(arrayType.is([])).toBe(false)

		// expect(arrayType.flaw(42)).toEqual({ type: "number[]", condition: "length == 3" })
		// expect(arrayType.flaw([1, 2, undefined])).toEqual({
		// 	type: "number[]",
		// 	condition: "length == 3",
		// 	flaws: [
		// 		{
		// 			type: "number[2]",
		// 		},
		// 	],
		// })
		// expect(arrayType.flaw([1, 2, 3, 4])).toEqual({
		// 	type: "number[]",
		// 	condition: "length == 3",
		// })
	})
	it("number[] with minLength & maxLength criteria", () => {
		const arrayType = isly("number").array().restrict("length", "range", 1, 3)
		expect(arrayType.is([3, 4, 5])).toBe(true)

		expect(arrayType.is([1, 2, 3, 4])).toBe(false)
		expect(arrayType.is([])).toBe(false)

		// expect(arrayType.flaw(42)).toEqual({ type: "number[]", condition: "minLength == 1 & maxLength == 3" })
	})
	it("object[] get", () => {
		type User = {
			email: string
		}
		const userArrayType = isly<User>("object", { email: isly("string") }).array()
		const usersWithPassword: (User & { password: string })[] = [...Array(5).keys()].map(id => ({
			email: `${id}@example.com`,
			password: "shouldBeSecret",
		}))

		const users: User[] | undefined = userArrayType.get(usersWithPassword)
		expect(users).not.toBeUndefined()
		expect(users?.[2]).toHaveProperty("email")
		expect(users?.[2]).not.toHaveProperty("password")
	})
})
