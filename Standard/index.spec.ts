import { isly } from "../index"

describe("isly.Standard", () => {
	it("values", () => expect(isly.Standard.values).toEqual(["ArrayBufferLike", "ArrayBufferView"]))
	it.each([["ArrayBuffer", ArrayBuffer]] as const)("('ArrayBufferLike').is(%s)", (name, constructor) => {
		const type = isly.standard("ArrayBufferLike")
		expect(type.flawed(new constructor())).toEqual(false)
		expect(type.definition).toEqual({
			class: "union",
			name: "ArrayBufferLike",

			base: [
				{
					class: "instance",
					name: "ArrayBuffer",
				},
				{
					class: "instance",
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
			class: "object",
			name: "ArrayBufferView",
			properties: {
				buffer: {
					class: "union",
					name: "ArrayBufferLike",

					base: [
						{
							class: "instance",
							name: "ArrayBuffer",
						},
						{
							class: "instance",
							name: "SharedArrayBuffer",
						},
					],
				},
				byteOffset: {
					class: "number",
					name: "number",
				},
				byteLength: {
					class: "number",
					name: "number",
				},
			},
		})
		expect(type.is(new constructor())).toBe(true)
	})
})
