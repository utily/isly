import { creator as isly } from "./index"

export interface DemoType {
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

	// children?: DemoType[]
	regExp: RegExp
	testMethod: () => boolean
}
export namespace DemoType {
	export const { type, is, flawed } = isly
		.object<DemoType>({
			// number
			anyNumber: isly.number(),
			numberOf: isly.number("positive"),
			temperature: isly.number("greater", -273.15),
			// string
			message: isly.string(),
			email: isly.string("value", /\S+@\S+\.\S+/),
			currency: isly.string("value", "SEK", "EUR"),
			// boolean
			new: isly.boolean(),
			fromServer: isly.boolean(true),

			myTuple: isly.tuple(isly.string(), isly.number()),
			myUnion: isly.union(isly.string(), isly.number()),
			myArray: isly.array(isly.string(), "length", "minimum", 1),
			myIntersection: isly.intersection(
				isly.object<{ a: string }>({ a: isly.string() }),
				isly.object<{ b: string }>({ b: isly.string() })
			),

			// Recursive
			// children: isly(() => type)
			// 	.array()
			// 	.optional(),
			regExp: isly.from<RegExp>("RegExp", value => value instanceof RegExp),
			// function
			testMethod: isly.function<DemoType["testMethod"]>(),
		})
		.bind()
}
describe("isly", () => {
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
		// children?: DemoType[],
		regExp: /abc/,
		testMethod: () => true,
	}
	it("flawed(value) == false", () => expect(DemoType.flawed(value)).toEqual(false))
	it("is(value) == true", () => expect(DemoType.is(value)).toEqual(true))
	it("is() == false", () => expect(DemoType.is({ amount: 13.37, numberOf: 1, temperature: -400 })).toEqual(false))
	it("flawed({ currency: SEK })", () =>
		expect(DemoType.flawed({ currency: "SEK" })).toEqual({
			name: "{ anyNumber: number, numberOf: number, temperature: number, message: string, email: string, currency: ('SEK' | 'EUR'), new: boolean, fromServer: true, myTuple: [string, number], myUnion: (string | number), myArray: string[], myIntersection: { a: string } & { b: string }, regExp: RegExp, testMethod: function }",
			description:
				"Object of type { anyNumber: number, numberOf: number, temperature: number, message: string, email: string, currency: ('SEK' | 'EUR'), new: boolean, fromServer: true, myTuple: [string, number], myUnion: (string | number), myArray: string[], myIntersection: { a: string } & { b: string }, regExp: RegExp, testMethod: function }.",
			flaws: [
				{ property: "anyNumber", name: "number", description: "Any finite numeric value." },
				{ property: "numberOf", name: "number", condition: ["positive"], description: "Any finite numeric value." },
				{
					property: "temperature",
					name: "number",
					condition: ["greater: -273.15"],
					description: "Any finite numeric value.",
				},
				{ property: "message", name: "string", description: "A string value." },
				{ property: "email", name: "string", condition: ["value: /\\S+@\\S+\\.\\S+/"], description: "A string value." },
				{ property: "new", name: "boolean", description: "Value has to be true or false." },
				{ property: "fromServer", name: "true", condition: ["value: true"], description: "Value has to be true." },
				{
					property: "myTuple",
					name: "[string, number]",
					description: "Tuple of [string, number].",
					flaws: [
						{ index: 0, name: "string", description: "A string value." },
						{ index: 1, name: "number", description: "Any finite numeric value." },
					],
				},
				{
					property: "myUnion",
					name: "(string | number)",
					description: "Union of base types.",
					flaws: [
						{ name: "string", description: "A string value." },
						{ name: "number", description: "Any finite numeric value." },
					],
				},
				{
					property: "myArray",
					name: "string[]",
					condition: ["length.minimum: 1"],
					description: "Array of string[].",
					flaws: [
						{
							name: "string",
							description: "A string value.",
						},
					],
				},
				{
					property: "myIntersection",
					name: "{ a: string } & { b: string }",
					description: "Intersection of base types.",
					flaws: [
						{
							name: "{ a: string }",
							description: "Object of type { a: string }.",
							flaws: [
								{
									property: "a",
									name: "string",
									description: "A string value.",
								},
							],
						},
						{
							name: "{ b: string }",
							description: "Object of type { b: string }.",
							flaws: [
								{
									property: "b",
									name: "string",
									description: "A string value.",
								},
							],
						},
					],
				},
				{ property: "regExp", name: "RegExp", description: "Value has to fulfill custom predicate." },
				{ property: "testMethod", name: "function", description: "Value has to be a function." },
			],
		}))
})
