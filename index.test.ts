import { isly } from "./index"

describe("isly", () => {
	it("object", () => {
		type DemoType = {
			anyNumber: number
			numberOf: number
			temperature: number

			message: string
			email: string
			currency: "SEK" | "EUR"

			new: boolean
			fromServer: true

			myTuple: [string, number]
			myUnion: string | number
			myArray: string[]
			myIntersection: { a: string } & { b: string }

			children?: DemoType[]
			regExp: RegExp
			testMethod: () => boolean
		}

		const type: isly.Type<DemoType> = isly("object", {
			// number
			anyNumber: isly("number"),
			numberOf: isly("number").restrict("positive"),
			temperature: isly("number").restrict("greater", -273.15),
			// string
			message: isly("string"),
			email: isly("string", /\S+@\S+\.\S+/),
			currency: isly("string", ["SEK", "EUR"]),
			// boolean
			new: isly("boolean"),
			fromServer: isly("boolean", true),

			myTuple: isly("tuple", isly("string"), isly("number")),
			myUnion: isly("union", isly("string"), isly("number")),
			myArray: isly("array", isly("string").restrict("length", "minimum", 1)),
			myIntersection: isly(
				"intersection",
				isly<{ a: string }>("object", { a: isly("string") }),
				isly<{ b: string }>("object", { b: isly("string") })
			),

			// Recursive
			// children: isly(
			// 	"array",
			// 	isly(() => type, "DemoType")
			// ).optional(),
			regExp: isly<RegExp>("from", value => value instanceof RegExp, "RegExp"),
			// function
			testMethod: isly<DemoType["testMethod"]>("function"),
		})

		const value: DemoType = {
			anyNumber: -12,
			numberOf: 10,
			temperature: 25,

			message: "d",
			email: "info@example.com",
			currency: "SEK",

			new: false,
			fromServer: true,

			myTuple: ["a", 1],
			myUnion: "a",
			myArray: ["a"],
			myIntersection: { a: "A", b: "B" },
			//children?: DemoType[],
			regExp: /abc/,
			testMethod: () => true,
		}
		// expect(type.flaw(value)).toEqual({
		// 	isFlaw: false,
		// 	message: "This type is correct.",
		// 	type: "{anyNumber: number, numberOf: number, temperature: number, message: string, email: string, currency: string, new: boolean, fromServer: true, myTuple: [string, number], myUnion: string | number, myArray: string[], myIntersection: {a: string} & {b: string}, children: DemoType[] | undefined, regExp: RegExp, testMethod: function}",
		// })
		expect(type.is(value)).toEqual(true)

		expect(type.is({ amount: 13.37, numberOf: 1, temperature: -400 })).toEqual(false)

		// expect(type.flaw({ currency: "SEK" })).toEqual({
		// 	flaws: [
		// 		{ property: "anyNumber", type: "number" },
		// 		{ property: "numberOf", type: "number", condition: "> 0" },
		// 		{ property: "temperature", type: "number", condition: "custom" },
		// 		{ property: "message", type: "string" },
		// 		{ property: "email", type: "string", condition: "/\\S+@\\S+\\.\\S+/" },
		// 		{ property: "new", type: "boolean" },
		// 		{ property: "fromServer", type: "true" },
		// 		{
		// 			property: "myTuple",
		// 			type: "[string, number]",
		// 			flaws: [
		// 				{ property: 0, type: "string" },
		// 				{ property: 1, type: "number" },
		// 			],
		// 		},
		// 		{ property: "myUnion", type: "string | number", flaws: [{ type: "string" }, { type: "number" }] },
		// 		{
		// 			property: "myArray",
		// 			condition: "minLength == 1",
		// 			type: "string[]",
		// 		},
		// 		{
		// 			property: "myIntersection",
		// 			flaws: [
		// 				{
		// 					flaws: [
		// 						{
		// 							property: "a",
		// 							type: "string",
		// 						},
		// 					],
		// 					type: "{a: string}",
		// 				},
		// 				{
		// 					flaws: [
		// 						{
		// 							property: "b",
		// 							type: "string",
		// 						},
		// 					],
		// 					type: "{b: string}",
		// 				},
		// 			],
		// 			type: "{a: string} & {b: string}",
		// 		},
		// 		{ property: "regExp", type: "RegExp" },
		// 		{ property: "testMethod", type: "function" },
		// 	],
		// 	type: "{anyNumber: number, numberOf: number, temperature: number, message: string, email: string, currency: string, new: boolean, fromServer: true, myTuple: [string, number], myUnion: string | number, myArray: string[], myIntersection: {a: string} & {b: string}, children: DemoType[] | undefined, regExp: RegExp, testMethod: function}",
		// })
	})
})
