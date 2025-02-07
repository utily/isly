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

export function isly<V = any>(type: "any", name?: string): isly.Any<V>
export function isly<V = unknown, B extends Base<V> = Base<V>>(
	type: "array",
	base: B,
	...restriction: isly.Array.Restriction | []
): isly.Array<V, B>
export function isly<V extends boolean = boolean>(type: "boolean", allowed?: V): isly.Boolean<V>
export function isly<V = unknown>(
	type: "from",
	name: string,
	is: (value: V | any) => value is V,
	prune?: (value: V | any) => V | undefined
): isly.From<V>
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isly<V extends Function = Function>(type: "function", name?: string): isly.Function<V>
export function isly<V extends null = null>(type: "null"): isly.Null<V>
export function isly<V extends number = number>(type: "number"): isly.Number<V>
export function isly<V extends number = number>(
	type: "number",
	...restriction: [] | isly.Number.Restriction<V> | Base.Restriction
): isly.Number<V>
export function isly<V extends object = object>(
	type: "instance",
	constructor: new (...properties: any[]) => V,
	name: string
): isly.Instance<V>
export function isly<T extends A & B, A, B>(type: "intersection", typeA: Base<A>, typeB: Base<B>): isly.Intersection<T>
export function isly<T extends A & B & C, A, B, C>(
	type: "intersection",
	typeA: Base<A>,
	typeB: Base<B>,
	typeC: Base<C>
): isly.Intersection<T>
export function isly<T extends A & B & C, A, B, C>(
	type: "intersection",
	typeA: Base<A>,
	typeB: Base<B>,
	typeC: Base<C>
): isly.Intersection<T>
export function isly<T extends A & B & C & D, A, B, C, D>(
	type: "intersection",
	typeA: Base<A>,
	typeB: Base<B>,
	typeC: Base<C>,
	typeD: Base<D>
): isly.Intersection<T>
export function isly<T extends A & B & C & D & E, A, B, C, D, E>(
	type: "intersection",
	typeA: Base<A>,
	typeB: Base<B>,
	typeC: Base<C>,
	typeD: Base<D>,
	typeE: Base<E>
): isly.Intersection<T>
export function isly<T extends A & B & C & D & E & F, A, B, C, D, E, F>(
	type: "intersection",
	typeA: Base<A>,
	typeB: Base<B>,
	typeC: Base<C>,
	typeD: Base<D>,
	typeE: Base<E>,
	typeF: Base<F>
): isly.Intersection<T>
export function isly<V, B extends Base<V>>(type: "intersection", ...base: B[]): isly.Intersection<V, B>
export function isly<V extends object = Record<string, any>>(
	type: "object",
	properties: isly.Object.Properties<V>,
	name?: string
): isly.Object<V>
export function isly<V extends any | undefined = unknown | undefined, B extends Base<V> = Base<V>>(
	type: "optional",
	base: B,
	name?: string
): isly.Optional<V, B>
export function isly<V extends any | undefined = unknown | undefined, B extends Base<V> = Base<V>>(
	type: "readonly",
	base: B,
	name?: string
): isly.Readonly<V, B>
export function isly<
	V extends globalThis.Record<string, any> | globalThis.Record<number, any> | globalThis.Record<symbol, any> = Record<
		string,
		any
	>,
	KType extends keyof V extends string
		? isly.String
		: keyof V extends number
		? isly.Number
		: isly.Unknown<symbol> = keyof V extends string
		? isly.String
		: keyof V extends number
		? isly.Number
		: isly.Unknown<symbol>,
	VType extends Base<V[keyof V]> = isly.Unknown<V[keyof V]>
>(type: "record", key: KType, value: VType, name?: string): isly.Record<V, KType, VType>
export function isly<V extends string = string>(type: "string"): isly.String<V>
export function isly<V extends string = string>(
	type: "string",
	...restriction: [] | isly.String.Restriction<V> | Base.Restriction
): isly.String<V>
export function isly<V extends any[] = unknown[]>(type: "tuple", ...base: { [I in keyof V]: Base<V[I]> }): isly.Tuple<V>
export function isly<V extends undefined = undefined>(type: "undefined", name?: string): isly.Undefined<V>
export function isly<T extends A | B, A, B>(type: "union", ...types: [Base<A>, Base<B>]): isly.Union<T>
export function isly<T extends A | B | C, A, B, C>(type: "union", ...types: [Base<A>, Base<B>, Base<C>]): isly.Union<T>
export function isly<T extends A | B | C | D, A, B, C, D>(
	type: "union",
	...types: [Base<A>, Base<B>, Base<C>, Base<D>]
): isly.Union<T>
export function isly<T extends A | B | C | D | E, A, B, C, D, E>(
	type: "union",
	...types: [Base<A>, Base<B>, Base<C>, Base<D>, Base<E>]
): isly.Union<T>
export function isly<T extends A | B | C | D | E | F, A, B, C, D, E, F>(
	type: "union",
	...types: [Base<A>, Base<B>, Base<C>, Base<D>, Base<E>, Base<F>]
): isly.Union<T>
export function isly<V>(type: "union", ...types: Base<V>[]): isly.Union<V>
export function isly<V extends undefined = undefined>(type: "unknown", name?: string): isly.Unknown<V>
export function isly<V = any, B extends Base<V> = Base<V>>(load: () => B): B
export function isly(type: "ArrayBufferLike"): isly.Object<ArrayBufferLike>
export function isly(type: "ArrayBufferView"): isly.Object<ArrayBufferView>
export function isly(type: isly.Class | isly.Standard | (() => isly.Type), ...properties: any[]): isly.Type {
	return typeof type == "function"
		? lazy(type)
		: isly.Standard.is(type)
		? load(type)
		: (creator as globalThis.Record<isly.Class, (...properties: any[]) => isly.Type>)[type](...properties)
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
