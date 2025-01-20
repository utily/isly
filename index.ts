import { Any as islyAny } from "./Any"
import { Array as islyArray } from "./Array"
import { ArrayBufferLike as islyArrayBufferLike } from "./ArrayBufferLike"
import { ArrayBufferView as islyArrayBufferView } from "./ArrayBufferView"
import { Boolean as islyBoolean } from "./Boolean"
import { Class as islyClass } from "./Class"
import { From as islyFrom } from "./From"
import { Function as islyFunction } from "./Function"
import { Instance as islyInstance } from "./Instance"
import { Intersection as islyIntersection } from "./Intersection"
import { Lazy as islyLazy } from "./Lazy"
import { Null as islyNull } from "./Null"
import { Number as islyNumber } from "./Number"
import { Object as islyObject } from "./Object"
import { Optional as islyOptional } from "./Optional"
import { Readonly as islyReadonly } from "./Readonly"
import { Record as islyRecord } from "./Record"
import { String as islyString } from "./String"
import { Type as islyType } from "./Type"
import { Undefined as islyUndefined } from "./Undefined"
import { Union as islyUnion } from "./Union"
import { Unknown as islyUnknown } from "./Unknown"

export function isly<T = any>(type: "any", name?: string): isly.Type<T>
export function isly<T = any>(type: "array", base: isly.Type<T>, name?: string): isly.Type<T[]>
export function isly<T extends ArrayBufferLike = ArrayBufferLike>(type: "type", name?: string): isly.Type<T>
export function isly<T extends globalThis.ArrayBufferLike = globalThis.ArrayBufferLike>(
	type: "type",
	name?: string
): isly.Type<globalThis.ArrayBufferView<T>>
export function isly<T extends boolean = boolean>(type: "boolean", value?: T): isly.Type<T>
export function isly<T>(type: "from", is: (value: T | any) => value is T, name: string): isly.Type<T>
export function isly<T>(type: "from", is: (value: any) => boolean, name: string): isly.Type<T>
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isly<T extends Function>(type: "function"): isly.Type<T>
export function isly<T = undefined>(type: "instance", constructor: new () => T, name: string): isly.Type<T>
export function isly<T extends A & B, A, B>(
	type: "intersection",
	typeA: isly.Type<A>,
	typeB: isly.Type<B>
): isly.Type<T>
export function isly<T extends A & B & C, A, B, C>(
	type: "intersection",
	typeA: isly.Type<A>,
	typeB: isly.Type<B>,
	typeC: isly.Type<C>
): isly.Type<T>
export function isly<T extends A & B & C, A, B, C>(
	type: "intersection",
	typeA: isly.Type<A>,
	typeB: isly.Type<B>,
	typeC: isly.Type<C>
): isly.Type<T>
export function isly<T extends A & B & C & D, A, B, C, D>(
	type: "intersection",
	typeA: isly.Type<A>,
	typeB: isly.Type<B>,
	typeC: isly.Type<C>,
	typeD: isly.Type<D>
): isly.Type<T>
export function isly<T extends A & B & C & D & E, A, B, C, D, E>(
	type: "intersection",
	typeA: isly.Type<A>,
	typeB: isly.Type<B>,
	typeC: isly.Type<C>,
	typeD: isly.Type<D>,
	typeE: isly.Type<E>
): isly.Type<T>
export function isly<T extends A & B & C & D & E & F, A, B, C, D, E, F>(
	type: "intersection",
	typeA: isly.Type<A>,
	typeB: isly.Type<B>,
	typeC: isly.Type<C>,
	typeD: isly.Type<D>,
	typeE: isly.Type<E>,
	typeF: isly.Type<F>
): isly.Type<T>
export function isly<T, R extends isly.Type<T> = isly.Type<T>>(creator: () => R): R // lazy
export function isly<T = null>(type: "null", name?: string): isly.Type<T>
export function isly<T extends number = number>(type: "number", name?: string): isly.Type<T>
export function isly<T extends object = Record<string, any>>(
	type: "object",
	properties: isly.Object.Properties<T>,
	name?: string
): isly.Object<T>
export function isly<T>(type: "optional", base: isly.Type<T>): isly.Type<T | undefined>
export function isly<T>(type: "readonly", base: isly.Type<T>): isly.Type<Readonly<T>>
export function isly<T extends Record<string | number, any>>(
	type: "record",
	key: isly.Type<keyof T>,
	value: isly.Type<T[keyof T]>
): isly.Type<T>
export function isly<K extends string | number, V>(
	type: "record",
	key: isly.Type<K>,
	value: isly.Type<V>
): isly.Type<Record<K, V>>
export function isly<T extends string = string>(type: "string"): isly.Type<T>
export function isly<T extends string = string>(type: "string", values: readonly T[]): isly.Type<T>
export function isly<T extends string = string>(type: "string", ...values: readonly T[]): isly.Type<T>
export function isly<T extends string = string>(type: "string", condition: RegExp): isly.Type<T>
export function isly<T extends any[]>(type: "tuple", ...types: { [I in keyof T]: isly.Type<T[I]> }): isly.Type<T>
export function isly<T = undefined>(type: "undefined", name?: string): isly.Type<T>
export function isly<T extends A | B, A, B>(type: "union", ...types: [isly.Type<A>, isly.Type<B>]): isly.Type<T>
export function isly<T extends A | B | C, A, B, C>(
	type: "union",
	...types: [isly.Type<A>, isly.Type<B>, isly.Type<C>]
): isly.Type<T>
export function isly<T extends A | B | C | D, A, B, C, D>(
	type: "union",
	...types: [isly.Type<A>, isly.Type<B>, isly.Type<C>, isly.Type<D>]
): isly.Type<T>
export function isly<T extends A | B | C | D | E, A, B, C, D, E>(
	type: "union",
	...types: [isly.Type<A>, isly.Type<B>, isly.Type<C>, isly.Type<D>, isly.Type<E>]
): isly.Type<T>
export function isly<T extends A | B | C | D | E | F, A, B, C, D, E, F>(
	type: "union",
	...types: [isly.Type<A>, isly.Type<B>, isly.Type<C>, isly.Type<D>, isly.Type<E>, isly.Type<F>]
): isly.Type<T>
export function isly<T>(type: "union", ...types: isly.Type<T>[]): isly.Type<T>
export function isly<T = unknown>(type: "unknown", name?: string): isly.Type<T>
export function isly<T>(type: isly.Class | (() => isly.Type<T>), ...argument: any[]): isly.Type<T> {
	return typeof type != "string"
		? isly.Lazy.create<T>(type)
		: (
				{
					any: isly.Any.create,
					array: isly.Array.create,
					object: isly.Object.create,
				} as unknown as Record<isly.Class, (...argument: any[]) => isly.Type<T>>
		  )[type](...argument)
}

export namespace isly {
	export import Any = islyAny
	export import Array = islyArray
	export import Class = islyClass
	export import Object = islyObject
	export import Type = islyType
	export import ArrayBufferLike = islyArrayBufferLike
	export import ArrayBufferView = islyArrayBufferView
	export import Boolean = islyBoolean
	export import From = islyFrom
	export import Function = islyFunction
	export import Instance = islyInstance
	export import Intersection = islyIntersection
	export import Lazy = islyLazy
	export import Null = islyNull
	export import Number = islyNumber
	export import Optional = islyOptional
	export import Readonly = islyReadonly
	export import Record = islyRecord
	export import String = islyString
	export import Undefined = islyUndefined
	export import Union = islyUnion
	export import Unknown = islyUnknown
}
