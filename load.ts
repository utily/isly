import { Base } from "./Base"
import type { isly } from "./index"

export function load(type: isly.Standard): isly.Type {
	return {
		ArrayBufferLike: () =>
			Base.isly.union<ArrayBufferLike>(
				Base.isly.instance(ArrayBuffer, "ArrayBuffer"),
				Base.isly.instance(SharedArrayBuffer, "SharedArrayBuffer")
			),
		ArrayBufferView: () =>
			Base.isly.object<ArrayBufferView>(
				{
					buffer: Base.isly.standard("ArrayBufferLike") as Base<ArrayBufferLike>,
					byteLength: Base.isly.number(),
					byteOffset: Base.isly.number(),
				},
				"ArrayBufferView"
			),
	}[type]!()
}
