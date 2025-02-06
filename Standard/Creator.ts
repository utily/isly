import type { islyObject } from "../Object"

export interface Creator {
	(type: "ArrayBufferLike"): islyObject<ArrayBufferLike>
	(type: "ArrayBufferView"): islyObject<ArrayBufferView>
}
export namespace Creator {}
