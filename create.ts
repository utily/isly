import { Class as AnyClass } from "./Any/Class"
import { Class as ArrayClass } from "./Array/Class"
import { Class as BooleanClass } from "./Boolean/Class"
import { Class as FromClass } from "./From/Class"
import { Class as FunctionClass } from "./Function/Class"
import type { isly } from "./index"
import { Class as InstanceClass } from "./Instance/Class"
import { Class as IntersectionClass } from "./Intersection/Class"
import { Class as NullClass } from "./Null/Class"
import { Class as NumberClass } from "./Number/Class"
import { Class as ObjectClass } from "./Object/Class"
import { Class as OptionalClass } from "./Optional/Class"
import { Class as ReadonlyClass } from "./Readonly/Class"
import { Class as RecordClass } from "./Record/Class"
import { Class as StringClass } from "./String/Class"
import { Class as TupleClass } from "./Tuple/Class"
import { Class as UndefinedClass } from "./Undefined/Class"
import { Class as UnionClass } from "./Union/Class"
import { Class as UnknownClass } from "./Unknown/Class"

export function create(type: isly.Class, ...properties: any[]): isly.Type {
	return (creator as globalThis.Record<isly.Class, (...properties: any[]) => isly.Type>)[type](...properties)
}
export const creator = {
	any: AnyClass.create,
	array: ArrayClass.create,
	boolean: BooleanClass.create,
	from: FromClass.create,
	function: FunctionClass.create,
	null: NullClass.create,
	number: NumberClass.create,
	instance: InstanceClass.create,
	intersection: IntersectionClass.create,
	object: ObjectClass.create,
	optional: OptionalClass.create,
	readonly: ReadonlyClass.create,
	record: RecordClass.create,
	string: StringClass.create,
	tuple: TupleClass.create,
	undefined: UndefinedClass.create,
	union: UnionClass.create,
	unknown: UnknownClass.create,
}
