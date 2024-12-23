import { isly } from "../index"

describe("isly.arrayBufferView", () => {
	it.each([
		["Uint8Array", Uint8Array],
		["Uint16Array", Uint16Array],
		["Uint32Array", Uint32Array],
		["Int8Array", Int8Array],
		["Int16Array", Int16Array],
		["Int32Array", Int32Array],
	] as const)("is ArrayBufferView %s", (name, constructor) => {
		const type = isly.arrayBufferView()
		expect(type.flaw(new constructor())).toEqual({
			isFlaw: false,
			message: "This type is correct.",
			type: "ArrayBufferView",
		})
		expect(type.is(new constructor())).toBe(true)
	})
})
