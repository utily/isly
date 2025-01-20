import { Instance } from "../Instance"
import { Type } from "../Type"
import { Union } from "../Union"

export namespace ArrayBufferLike {
	export function create<T extends globalThis.ArrayBufferLike = globalThis.ArrayBufferLike>(name?: string): Type<T> {
		return Union.create<T, ArrayBuffer, SharedArrayBuffer>(
			Instance.create(ArrayBuffer, "ArrayBuffer"),
			Instance.create(SharedArrayBuffer, "SharedArrayBuffer")
		).rename(name ?? "ArrayBufferLike")
	}
}
