import { Any as islyAny } from "./Any"
import { Class as AnyClass } from "./Any/Class"
import { Array as islyArray } from "./Array"
import { Class as ArrayClass } from "./Array/Class"
import { Base } from "./Base"
import { Boolean as islyBoolean } from "./Boolean"
import { Class as BooleanClass } from "./Boolean/Class"
import { Class as islyClass } from "./Class"
import { Definition as islyDefinition } from "./Definition"
import { Flaw as islyFlaw } from "./Flaw"
import { From as islyFrom } from "./From"
import { Class as FromClass } from "./From/Class"
import { Function as islyFunction } from "./Function"
import { Class as FunctionClass } from "./Function/Class"
import { Instance as islyInstance } from "./Instance"
import { Class as InstanceClass } from "./Instance/Class"
import { Intersection as islyIntersection } from "./Intersection"
import { Class as IntersectionClass } from "./Intersection/Class"
import { lazy } from "./lazy"
import { load } from "./load"
import { Null as islyNull } from "./Null"
import { Class as NullClass } from "./Null/Class"
import { Number as islyNumber } from "./Number"
import { Class as NumberClass } from "./Number/Class"
import { islyObject } from "./Object"
import { Class as ObjectClass } from "./Object/Class"
import { Optional as islyOptional } from "./Optional"
import { Class as OptionalClass } from "./Optional/Class"
import { Readonly as islyReadonly } from "./Readonly"
import { Class as ReadonlyClass } from "./Readonly/Class"
import { Record as islyRecord } from "./Record"
import { Class as RecordClass } from "./Record/Class"
import { Standard as islyStandard } from "./Standard"
import { String as islyString } from "./String"
import { Class as StringClass } from "./String/Class"
import { Tuple as islyTuple } from "./Tuple"
import { Class as TupleClass } from "./Tuple/Class"
import { Type as islyType } from "./Type"
import { Undefined as islyUndefined } from "./Undefined"
import { Class as UndefinedClass } from "./Undefined/Class"
import { Union as islyUnion } from "./Union"
import { Class as UnionClass } from "./Union/Class"
import { Unknown as islyUnknown } from "./Unknown"
import { Class as UnknownClass } from "./Unknown/Class"

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
	lazy,
	standard: load,
}
Base.isly = creator

export namespace isly {
	export import Any = islyAny
	export import Array = islyArray
	export import Boolean = islyBoolean
	export import Class = islyClass
	export type Creator = typeof creator
	export import Definition = islyDefinition
	export import Flaw = islyFlaw
	export import From = islyFrom
	export import Function = islyFunction
	export import Null = islyNull
	export import Number = islyNumber
	export import Instance = islyInstance
	export import Intersection = islyIntersection
	export import Object = islyObject
	export import Optional = islyOptional
	export import Readonly = islyReadonly
	export import Record = islyRecord
	export import Standard = islyStandard
	export import String = islyString
	export import Tuple = islyTuple
	export import Type = islyType
	export import Undefined = islyUndefined
	export import Union = islyUnion
	export import Unknown = islyUnknown
}
