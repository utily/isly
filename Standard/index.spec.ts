import { isly } from "../index"
import type { Standard } from "./index"

describe("isly.Standard", () => {
	it("values", () =>
		expect(isly.Standard.values).toEqual([
			"ArrayBuffer",
			"ArrayBufferLike",
			"ArrayBufferView",
			"Blob",
			"File",
			"FormData",
			"Headers",
			"ReadableStream",
			"Request",
			"RequestInit",
			"Response",
			"ResponseInit",
			"URL",
			"URLSearchParams",
		]))
	it.each([["ArrayBuffer", new ArrayBuffer(0)]] as const)("is %s", (name, value) =>
		expect(isly.standard(name as Standard).is(value)).toBe(true)
	)
	it.each([["ArrayBuffer", ArrayBuffer]] as const)("('ArrayBufferLike').is(%s)", (_, constructor) =>
		expect(isly.standard("ArrayBufferLike").is(new constructor())).toBe(true)
	)
	it.each([
		["Uint8Array", Uint8Array],
		["Uint16Array", Uint16Array],
		["Uint32Array", Uint32Array],
		["Int8Array", Int8Array],
		["Int16Array", Int16Array],
		["Int32Array", Int32Array],
		["Float32Array", Float32Array],
		["Float64Array", Float64Array],
		["BigInt64Array", BigInt64Array],
		["BigUint64Array", BigUint64Array],
		["Uint8ClampedArray", Uint8ClampedArray],
		["DataView", DataView],
	] as const)("is ArrayBufferView %s", (_, constructor: new (buffer: ArrayBuffer) => ArrayBufferView) =>
		expect(isly.standard("ArrayBufferView").is(new constructor(new ArrayBuffer(16)))).toBe(true)
	)
	const types = [
		["Blob", new Blob(["test"])],
		["File", new File(["test"], "test.txt")],
		["FormData", new FormData()],
		["Headers", new Headers()],
		["ReadableStream", new ReadableStream()],
		["Request", new Request("https://example.com")],
		["RequestInit", { method: "GET" }],
		["Response", new Response()],
		["ResponseInit", { status: 200 }],
		["URL", new URL("https://example.com")],
		["URLSearchParams", new URLSearchParams()],
	] as const
	it.each(types)("is %s", (name, value) => expect(isly.standard(name as Standard).is(value)).toBe(true))
	it.each(types)("flawed %s", (name, value) => expect(isly.standard(name as Standard).flawed(value)).toBe(false))
	it.each([
		["GET request", new Request("https://example.com")],
		[
			"POST with JSON",
			new Request("https://example.com", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ test: true }),
			}),
		],
		[
			"PUT with text",
			new Request("https://example.com", {
				method: "PUT",
				headers: { "Content-Type": "text/plain" },
				body: "Hello World",
			}),
		],
		[
			"POST with FormData",
			new Request("https://example.com", {
				method: "POST",
				body: new FormData(),
			}),
		],
		["DELETE request", new Request("https://example.com", { method: "DELETE" })],
	] as const)("Request validation - %s", (_, request) => {
		const requestType = isly.standard("Request")
		expect(requestType.is(request)).toBe(true)
		expect(requestType.flawed(request)).toBe(false)
		expect(typeof request.clone).toBe("function")
		expect(typeof request.arrayBuffer).toBe("function")
		expect(typeof request.text).toBe("function")
		expect(typeof request.json).toBe("function")
		expect(typeof request.blob).toBe("function")
		expect(typeof request.formData).toBe("function")
	})
})
