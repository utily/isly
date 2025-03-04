import { isly } from "../index"

export interface Card {
	pan: string
	expires: Card.Expires
	csc: string
	holder?: string
}

export namespace Card {
	export type Expires = [Expires.Year, Expires.Month]
	export namespace Expires {
		export type Year = number
		export namespace Year {
			export const { type, is, flawed } = isly
				.number("range", 1000, 2999)
				.rename("Card.Expiry.Year")
				.describe("Expiry year of card as 4 digit.")
				.bind()
		}
		export type Month = number
		export namespace Month {
			export const { type, is, flawed } = isly
				.number("range", 1, 12)
				.rename("Card.Expiry.Month")
				.describe("Expiry month of card.")
				.bind()
		}
		export const { type, is, flawed } = isly
			.tuple<Expires>(Year.type, Month.type)
			.rename("Expires")
			.describe("Year and month the card expires.")
			.bind()
	}
	export const { type, is, flawed } = isly
		.object<Card>(
			{
				pan: isly.string("value", /^[\d]{16,19}$/),
				expires: Expires.type,
				csc: isly.string("length", "range", 3, 4),
				holder: isly.string().optional(),
			},
			"Card"
		)
		.describe("A card with a PAN, expiry date, CSC and optional holder name.")
		.bind()
}

describe("isly.Object.Card", () => {
	it.each([
		[
			{ pan: "123" },
			{
				description: "A card with a PAN, expiry date, CSC and optional holder name.",
				flaws: [
					{
						property: "pan",
						name: "string",
						condition: ["value: /^[\\d]{16,19}$/"],
					},
					{
						property: "expires",
						name: "Expires",
						description: "Year and month the card expires.",
						flaws: [
							{
								condition: ["range: [1000, 2999]"],
								description: "Expiry year of card as 4 digit.",
								index: 0,
								name: "Card.Expiry.Year",
							},
							{
								condition: ["range: [1, 12]"],
								description: "Expiry month of card.",
								index: 1,
								name: "Card.Expiry.Month",
							},
						],
					},
					{
						property: "csc",
						name: "string",
						condition: ["length.range: [3, 4]"],
					},
				],
				name: "Card",
			},
		],
	] as const)("flawed(%j) == %j", (value, expected) => {
		expect(Card.flawed(value)).toEqual(expected)
	})
	it.each([[{ pan: "123" }, false]] as const)("is(%j) == %j", (value, expected) => {
		expect(Card.is(value)).toBe(expected)
	})
})
