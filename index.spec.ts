import "jest"
import * as isly from "./index"

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
			children?: DemoType[]
		}

		const type: isly.Type<DemoType> = isly.object({
			// number
			anyNumber: isly.number(),
			numberOf: isly.number("positive"),
			temperature: isly.number(value => value > -273.15),
			// string
			message: isly.string(),
			email: isly.string(/\S+@\S+\.\S+/),
			currency: isly.string(["SEK", "EUR"]),
			// boolean
			new: isly.boolean(),
			fromServer: isly.boolean(true),

			myTuple: isly.tuple(isly.string(), isly.number()),
			myUnion: isly.union<DemoType["myUnion"]>(isly.string(), isly.number()),
			// Recursive
			children: isly.optional(isly.array(isly.lazy(() => type, "DemoType"))),
		})

		expect(type.is({ amount: 13.37, currency: "SEK" })).toEqual(false)
		expect(type.flaw({ currency: "SEK" })).toEqual({
			flaws: [
				{ property: "anyNumber", type: "number" },
				{ property: "numberOf", type: "number", condition: "> 0" },
				{ property: "temperature", type: "number", condition: "custom" },
				{ property: "message", type: "string" },
				{ property: "email", type: "string", condition: "/\\S+@\\S+\\.\\S+/" },
				{ property: "new", type: "boolean" },
				{ property: "fromServer", type: "true" },
				{
					property: "myTuple",
					type: "[string, number]",
					flaws: [
						{ property: 0, type: "string" },
						{ property: 1, type: "number" },
					],
				},
				{ property: "myUnion", type: "string | number", flaws: [{ type: "string" }, { type: "number" }] },
			],
			type: '{"anyNumber":"number","numberOf":"number","temperature":"number","message":"string","email":"string","currency":"string","new":"boolean","fromServer":"true","myTuple":"[string, number]","myUnion":"string | number","children":"DemoType[] | undefined"}',
		})
	})
})
