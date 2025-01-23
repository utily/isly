import { ArrayBufferLike } from "../ArrayBufferLike"
import { Number } from "../Number"
import { Object } from "../Object"
import { Type } from "../Type"

export namespace ArrayBufferView {
	export function create(name?: string): Type<globalThis.ArrayBufferView> {
		return Object.create<globalThis.ArrayBufferView>(
			{
				buffer: ArrayBufferLike.create(),
				byteLength: Number.create(),
				byteOffset: Number.create(),
			},
			name ?? "ArrayBufferView"
		)
	}
}
