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
import { Function as islyFunction } from "./Function"
import { Class as FunctionClass } from "./Function/Class"
import { Number as islyNumber } from "./Number"
import { Class as NumberClass } from "./Number/Class"
import { islyObject } from "./Object"
import { Class as ObjectClass } from "./Object/Class"
import { Optional as islyOptional } from "./Optional"
import { Class as OptionalClass } from "./Optional/Class"
import { Readonly as islyReadonly } from "./Readonly"
import { Class as ReadonlyClass } from "./Readonly/Class"
import { String as islyString } from "./String"
import { Class as StringClass } from "./String/Class"
import { Tuple as islyTuple } from "./Tuple"
import { Class as TupleClass } from "./Tuple/Class"
import { Type as islyType } from "./Type"
import { Undefined as islyUndefined } from "./Undefined"
import { Class as UndefinedClass } from "./Undefined/Class"
import { Union as islyUnion, Union } from "./Union"
import { Class as UnionClass } from "./Union/Class"

export function isly<V = any>(type: "any", name?: string): isly.Any<V>
export function isly<V = unknown, B extends Base<V> = Base<V>>(
	type: "array",
	base: B,
	...restriction: isly.Array.Restriction | []
): isly.Array<V, B>
export function isly<V extends boolean = boolean>(type: "boolean", allowed?: V): isly.Boolean<V>
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isly<V extends Function = Function>(type: "function", name?: string): isly.Function<V>
export function isly<V extends number = number>(type: "number"): isly.Number<V>
export function isly<V extends number = number>(
	type: "number",
	...restriction: [] | isly.Number.Restriction<V> | Base.Restriction
): isly.Number<V>
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
export function isly<V extends string = string>(type: "string"): isly.String<V>
export function isly<V extends string = string>(
	type: "string",
	...restriction: [] | isly.String.Restriction<V> | Base.Restriction
): isly.String<V>
export function isly<V extends any[] = unknown[]>(type: "tuple", ...base: { [I in keyof V]: Base<V[I]> }): isly.Tuple<V>
export function isly<V extends undefined = undefined>(type: "undefined", name?: string): isly.Undefined<V>
export function isly<T extends A | B, A, B>(type: "union", ...types: [Base<A>, Base<B>]): Union<T>
export function isly<T extends A | B | C, A, B, C>(type: "union", ...types: [Base<A>, Base<B>, Base<C>]): Union<T>
export function isly<T extends A | B | C | D, A, B, C, D>(
	type: "union",
	...types: [Base<A>, Base<B>, Base<C>, Base<D>]
): Union<T>
export function isly<T extends A | B | C | D | E, A, B, C, D, E>(
	type: "union",
	...types: [Base<A>, Base<B>, Base<C>, Base<D>, Base<E>]
): Union<T>
export function isly<T extends A | B | C | D | E | F, A, B, C, D, E, F>(
	type: "union",
	...types: [Base<A>, Base<B>, Base<C>, Base<D>, Base<E>, Base<F>]
): Union<T>
export function isly<V>(type: "union", ...types: Base<V>[]): Union<V>
export function isly(type: isly.Class, ...properties: any[]): isly.Type {
	const result = (
		{
			any: AnyClass.create,
			array: ArrayClass.create,
			boolean: BooleanClass.create,
			function: FunctionClass.create,
			number: NumberClass.create,
			object: ObjectClass.create,
			optional: OptionalClass.create,
			readonly: ReadonlyClass.create,
			string: StringClass.create,
			tuple: TupleClass.create,
			undefined: UndefinedClass.create,
			union: UnionClass.create,
		} as Record<isly.Class, (...properties: any[]) => isly.Type>
	)[type](...properties)
	// override methods that otherwise requires circular dependencies
	return result.modify({
		get definition(): isly.Definition {
			return isly.Definition.create(result)
		},
		array(...restriction: isly.Array.Restriction | []): isly.Array {
			return isly("array", result, ...restriction)
		},
		optional(name?: string): isly.Optional {
			return isly("optional", result, name)
		},
		readonly(name?: string): isly.Readonly {
			return isly("readonly", result, name)
		},
	})
}

export namespace isly {
	export import Any = islyAny
	export import Array = islyArray
	export import Boolean = islyBoolean
	export import Class = islyClass
	export import Definition = islyDefinition
	export import Flaw = islyFlaw
	export import Function = islyFunction
	export import Number = islyNumber
	export import Object = islyObject
	export import Optional = islyOptional
	export import Readonly = islyReadonly
	export import String = islyString
	export import Tuple = islyTuple
	export import Type = islyType
	export import Undefined = islyUndefined
	export import Union = islyUnion
}
