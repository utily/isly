import { Any as islyAny } from "./Any"
import { Array as islyArray } from "./Array"
import { Boolean as islyBoolean } from "./Boolean"
import { Class as islyClass } from "./Class"
import { create } from "./create"
import { Definition as islyDefinition } from "./Definition"
import { Flaw as islyFlaw } from "./Flaw"
import { From as islyFrom } from "./From"
import { Function as islyFunction } from "./Function"
import { Instance as islyInstance } from "./Instance"
import { Intersection as islyIntersection } from "./Intersection"
import { lazy } from "./lazy"
import { load } from "./load"
import { Null as islyNull } from "./Null"
import { Number as islyNumber } from "./Number"
import { islyObject } from "./Object"
import { Optional as islyOptional } from "./Optional"
import { Readonly as islyReadonly } from "./Readonly"
import { Record as islyRecord } from "./Record"
import { Standard as islyStandard } from "./Standard"
import { String as islyString } from "./String"
import { Tuple as islyTuple } from "./Tuple"
import { Type as islyType } from "./Type"
import { Undefined as islyUndefined } from "./Undefined"
import { Union as islyUnion } from "./Union"
import { Unknown as islyUnknown } from "./Unknown"

export function c(type: isly.Class | isly.Standard | (() => isly.Type), ...properties: any[]): isly.Type {
	return typeof type === "function"
		? lazy(type)
		: isly.Standard.is(type)
		? load(c as isly.Creator, type)
		: create(c as isly.Creator, type, ...properties)
}

export namespace isly {
	export import Any = islyAny
	export import Array = islyArray
	export import Boolean = islyBoolean
	export import Class = islyClass
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
	export type Creator =
		| isly.Any.Creator
		| isly.Array.Creator
		| isly.Boolean.Creator
		| isly.From.Creator
		| isly.Function.Creator
		| isly.Null.Creator
		| isly.Number.Creator
		| isly.Instance.Creator
		| isly.Intersection.Creator
		| isly.Object.Creator
		| isly.Optional.Creator
		| isly.Readonly.Creator
		| isly.Record.Creator
		| isly.Standard.Creator
		| isly.String.Creator
		| isly.Tuple.Creator
		| isly.Undefined.Creator
		| isly.Union.Creator
		| isly.Unknown.Creator
	export const create = c as Creator
}
