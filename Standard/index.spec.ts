import { isly } from "../index"

describe("isly.Standard", () => {
	it("values", () => expect(isly.Standard.values).toEqual(["ArrayBufferLike", "ArrayBufferView"]))
	it.each([["ArrayBuffer", ArrayBuffer]] as const)("('ArrayBufferLike').is(%s)", (name, constructor) => {
		const type = isly.standard("ArrayBufferLike")
		expect(type.flawed(new constructor())).toEqual(false)
		expect(type.definition).toEqual({
			name: "ArrayBufferLike",
			description: "Union of base types.",
			base: [
				{
					name: "ArrayBuffer",
					description: "Has to be instance of ArrayBuffer. ",
				},
				{
					name: "SharedArrayBuffer",
					description: "Has to be instance of SharedArrayBuffer. ",
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
			description: "Object of type ArrayBufferView.",
			condition: [],
			properties: {
				buffer: {
					name: "ArrayBufferLike",
					description: "Union of base types.",
					base: [
						{
							description: "Has to be instance of ArrayBuffer. ",
							name: "ArrayBuffer",
						},
						{
							description: "Has to be instance of SharedArrayBuffer. ",
							name: "SharedArrayBuffer",
						},
					],
				},
				byteOffset: {
					name: "number",
					description: "Any finite numeric value.",
				},
				byteLength: {
					name: "number",
					description: "Any finite numeric value.",
				},
			},
		})
		expect(type.is(new constructor())).toBe(true)
	})
})
