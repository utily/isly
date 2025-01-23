import { isly } from "../index"

describe("isly.instanceOf", () => {
	it.each([
		["Uint8Array", Uint8Array],
		["Uint16Array", Uint16Array],
		["Uint32Array", Uint32Array],
		["Int8Array", Int8Array],
		["Int16Array", Int16Array],
		["Int32Array", Int32Array],
		["ArrayBuffer", ArrayBuffer],
		["SharedArrayBuffer", SharedArrayBuffer],
	] as const)("is instanceOf %s", (name, constructor) => {
		const type = isly.instanceOf(constructor, name)
		expect(type.is(new constructor())).toBe(true)
	})
})
