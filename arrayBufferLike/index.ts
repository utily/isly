import { instanceOf } from "../instanceOf"
import { named as islyNamed } from "../named"
import { Type } from "../Type"
import { union as islyUnion } from "../union"

export function arrayBufferLike(name?: string): Type<ArrayBufferLike> {
	return islyNamed(
		name ?? "ArrayBufferLike",
		islyUnion<ArrayBufferLike>(
			instanceOf(ArrayBuffer, "ArrayBuffer"),
			instanceOf(SharedArrayBuffer, "SharedArrayBuffer")
		)
	)
}
