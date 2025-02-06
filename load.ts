import { Base } from "./Base"
import type { isly } from "./index"

export function load(type: isly.Standard): isly.Type {
	return {
		ArrayBufferLike: () =>
			Base.isly<ArrayBufferLike>(
				"union",
				Base.isly("instance", ArrayBuffer, "ArrayBuffer"),
				Base.isly("instance", SharedArrayBuffer, "SharedArrayBuffer")
			),
		ArrayBufferView: () =>
			Base.isly<ArrayBufferView>(
				"object",
				{
					buffer: Base.isly("ArrayBufferLike"),
					byteLength: Base.isly("number"),
					byteOffset: Base.isly("number"),
				},
				"ArrayBufferView"
			),
	}[type]!()
}
