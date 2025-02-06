import { Class as Any } from "Any/Class"
import { Class as Array } from "Array/Class"
import { Class as Boolean } from "Boolean/Class"
import { Class as From } from "From/Class"
import { Class as Function } from "Function/Class"
import type { isly } from "index"
import { Class as Instance } from "Instance/Class"
import { Class as Intersection } from "Intersection/Class"
import { Class as Null } from "Null/Class"
import { Class as Number } from "Number/Class"
import { Class as Object } from "Object/Class"
import { Class as Optional } from "Optional/Class"
import { Class as Readonly } from "Readonly/Class"
import { Class as Record } from "Record/Class"
import { Class as String } from "String/Class"
import { Class as Tuple } from "Tuple/Class"
import { Class as Undefined } from "Undefined/Class"
import { Class as Union } from "Union/Class"
import { Class as Unknown } from "Unknown/Class"

export function create(creator: isly.Creator, type: isly.Class, ...properties: any[]): isly.Type {
	const result = (
		{
			any: Any.create,
			array: Array.create,
			boolean: Boolean.create,
			from: From.create,
			function: Function.create,
			null: Null.create,
			number: Number.create,
			instance: Instance.create,
			intersection: Intersection.create,
			object: Object.create,
			optional: Optional.create,
			readonly: Readonly.create,
			record: Record.create,
			string: String.create,
			tuple: Tuple.create,
			undefined: Undefined.create,
			union: Union.create,
			unknown: Unknown.create,
		} as globalThis.Record<isly.Class, (...properties: any[]) => isly.Type>
	)[type](creator, ...properties)
	return result.modify() // decouple from prototype
}
export const creator = {
	any: ((...properties: any[]) => Any.create(creator, ...properties)) as Any.Creator,
	array: ((...properties: any[]) => Array.create(creator, ...properties)) as Array.Creator,
	boolean: ((...properties: any) => Boolean.create(creator, ...properties)) as Boolean.Creator,
	from: ((...properties: any[]) => From.create(creator, ...properties)) as From.Creator,
	function: ((...properties: any[]) => Function.create(creator, ...properties)) as Function.Creator,
	null: ((...properties: any[]) => Null.create(creator, ...properties)) as Null.Creator,
	number: ((...properties: any[]) => Number.create(creator, ...properties)) as Number.Creator,
	instance: ((...properties: any[]) => Instance.create(creator, ...properties)) as Instance.Creator,
	intersection: ((...properties: any[]) => Intersection.create(creator, ...properties)) as Intersection.Creator,
	object: ((...properties: any[]) => Object.create(creator, ...properties)) as Object.Creator,
	optional: ((...properties: any[]) => Optional.create(creator, ...properties)) as Optional.Creator,
	readonly: ((...properties: any[]) => Readonly.create(creator, ...properties)) as Readonly.Creator,
	record: ((...properties: any[]) => Record.create(creator, ...properties)) as Record.Creator,
	string: ((...properties: any[]) => String.create(creator, ...properties)) as String.Creator,
	tuple: ((...properties: any[]) => Tuple.create(creator, ...properties)) as Tuple.Creator,
	undefined: ((...properties: any[]) => Undefined.create(creator, ...properties)) as Undefined.Creator,
	union: ((...properties: any[]) => Union.create(creator, ...properties)) as Union.Creator,
	unknown: ((...properties: any[]) => Unknown.create(creator, ...properties)) as Unknown.Creator,
} as const
