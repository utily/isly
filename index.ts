import { create } from "create"
import { lazy } from "lazy"
import { Any as islyAny } from "./Any"
import { Array as islyArray } from "./Array"
import { Base } from "./Base"
import { Boolean as islyBoolean } from "./Boolean"
import { Class as islyClass } from "./Class"
import { Definition as islyDefinition } from "./Definition"
import { Flaw as islyFlaw } from "./Flaw"
import { From as islyFrom } from "./From"
import { Function as islyFunction } from "./Function"
import { Instance as islyInstance } from "./Instance"
import { Intersection as islyIntersection } from "./Intersection"
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
		? load(isly, type)
		: create(isly, type, ...properties)
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
}
