import type { isly } from "./index"

export function load(creator: isly.Creator, type: isly.Standard): isly.Type {
	return {
		ArrayBufferLike: () =>
			creator<ArrayBufferLike>(
				"union",
				creator("instance", ArrayBuffer, "ArrayBuffer"),
				creator("instance", SharedArrayBuffer, "SharedArrayBuffer")
			),
		ArrayBufferView: () =>
			creator<ArrayBufferView>(
				"object",
				{
					buffer: creator("ArrayBufferLike"),
					byteLength: creator("number"),
					byteOffset: creator("number"),
				},
				"ArrayBufferView"
			),
	}[type]!()
}
