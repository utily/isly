import { arrayBufferLike as islyArrayBufferLike } from "../arrayBufferLike"
import { number as islyNumber } from "../number"
import { object as islyObject } from "../object"
import { Type } from "../Type"

export function arrayBufferView<TArrayBuffer extends ArrayBufferLike = ArrayBufferLike>(
	name?: string
): Type<globalThis.ArrayBufferView<TArrayBuffer>> {
	return islyObject<globalThis.ArrayBufferView<TArrayBuffer>>(
		{ buffer: islyArrayBufferLike() as Type<TArrayBuffer>, byteLength: islyNumber(), byteOffset: islyNumber() },
		name ?? "ArrayBufferView"
	)
}
