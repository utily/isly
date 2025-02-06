import type { islyObject } from "../Object"

export type Creator = {
	(type: "ArrayBufferLike"): islyObject<ArrayBufferLike>
	(type: "ArrayBufferView"): islyObject<ArrayBufferView>
}
export namespace Creator {}
