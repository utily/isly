import { ArrayBufferLike } from "../ArrayBufferLike"
import { Number } from "../Number"
import { Object } from "../Object"
import { Type } from "../Type"

export namespace ArrayBufferView {
	export function create<T extends globalThis.ArrayBufferLike = globalThis.ArrayBufferLike>(
		name?: string
	): Type<globalThis.ArrayBufferView<T>> {
		return Object.create<globalThis.ArrayBufferView<T>>(
			{
				buffer: ArrayBufferLike.create() as unknown as Type<T>,
				byteLength: Number.create(),
				byteOffset: Number.create(),
			},
			name ?? "ArrayBufferView"
		)
	}
}
