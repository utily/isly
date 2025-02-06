export type Standard = typeof Standard.values[number]
import { Creator as StandardCreator } from "./Creator"

export namespace Standard {
	export import Creator = StandardCreator
	export const values = ["ArrayBufferView", "ArrayBufferLike"] as const
	export function is(value: Standard | any): value is Standard {
		return typeof value == "string" && values.some(v => v == value)
	}
}
