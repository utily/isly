import { isly } from "../index"

describe("isly.Standard", () => {
	it("values", () => expect(isly.Standard.values).toEqual(["ArrayBufferLike", "ArrayBufferView"]))
	it.each([["ArrayBuffer", ArrayBuffer]] as const)("('ArrayBufferLike').is(%s)", (name, constructor) => {
		const type = isly.standard("ArrayBufferLike")
		expect(type.flawed(new constructor())).toEqual(false)
		expect(type.definition).toEqual({
			name: "ArrayBufferLike",

			base: [
				{
					name: "ArrayBuffer",
				},
				{
					name: "SharedArrayBuffer",
				},
			],
		})
		expect(type.is(new constructor())).toBe(true)
	})
	it.each([
		["Uint8Array", Uint8Array],
		["Uint16Array", Uint16Array],
		["Uint32Array", Uint32Array],
		["Int8Array", Int8Array],
		["Int16Array", Int16Array],
		["Int32Array", Int32Array],
	] as const)("is ArrayBufferView %s", (name, constructor) => {
		const type = isly.standard("ArrayBufferView")
		expect(type.flawed(new constructor())).toEqual(false)
		expect(type.definition).toEqual({
			name: "ArrayBufferView",
			properties: {
				buffer: {
					name: "ArrayBufferLike",

					base: [
						{
							name: "ArrayBuffer",
						},
						{
							name: "SharedArrayBuffer",
						},
					],
				},
				byteOffset: {
					name: "number",
				},
				byteLength: {
					name: "number",
				},
			},
		})
		expect(type.is(new constructor())).toBe(true)
	})
})
