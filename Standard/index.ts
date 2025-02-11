import { Base } from "../Base"
import type { isly } from "../index"

export type Standard = keyof Mapping
interface Mapping {
	ArrayBufferLike: isly.Union<ArrayBufferLike>
	ArrayBufferView: isly.Object<ArrayBufferView>
}
const creator: { [P in Standard]: () => Mapping[P] } = {
	ArrayBufferLike: () =>
		Base.isly
			.union<ArrayBufferLike>(
				Base.isly.instance(ArrayBuffer, "ArrayBuffer"),
				Base.isly.instance(SharedArrayBuffer, "SharedArrayBuffer")
			)
			.rename("ArrayBufferLike"),
	ArrayBufferView: () =>
		Base.isly.object(
			{
				buffer: Base.isly.standard("ArrayBufferLike") as Base<ArrayBufferLike>, // TODO: fix typing to avoid cast
				byteLength: Base.isly.number(),
				byteOffset: Base.isly.number(),
			},
			"ArrayBufferView"
		),
} as const
export namespace Standard {
	export const values = Object.keys(creator)
	// export const { type, is, flawed } = Base.isly.string("value", ...values).bind()
	export function create<V extends Standard>(type: isly.Standard): Mapping[V] {
		return creator[type]() as unknown as Mapping[V]
	}
}
