import { isly } from "../index"

describe("isly.arrayBufferLike", () => {
	it.each([["ArrayBuffer", ArrayBuffer]] as const)("is ArrayBufferLike %s", (name, constructor) => {
		const type = isly.arrayBufferLike()
		expect(type.flaw(new constructor())).toEqual({
			isFlaw: false,
			message: "This type is correct.",
			type: "ArrayBufferLike",
		})
		expect(type.is(new constructor())).toBe(true)
	})
})
