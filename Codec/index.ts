import { Class } from "../Class"
import { Json as _Json } from "./Json"
import { Number as _Number } from "./Number"
import { String as _String } from "./String"

export interface Codec<V = any> {
	encode(value: V): string | undefined
	decode(data: string): V | undefined
}
export namespace Codec {
	export import Json = _Json
	export import Number = _Number
	export import String = _String
	export function create<C extends Class, V extends Class.Value[C] = Class.Value[C]>(type: C): Codec<V> {
		let result: Codec<V>
		switch (type) {
			case "number":
				result = Number.create() as Codec<V>
				break
			case "string":
				result = String.create() as Codec<V>
				break
			default:
				result = Json.create<V>()
				break
		}
		return result
	}
}
