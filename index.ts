import { Array as islyArray } from "./Array"
import { Class as ArrayClass } from "./Array/Class"
import { Base } from "./Base"
import { Boolean as islyBoolean } from "./Boolean"
import { Class as BooleanClass } from "./Boolean/Class"
import { Class as islyClass } from "./Class"
import { Definition, Definition as islyDefinition } from "./Definition"
import { Number as islyNumber } from "./Number"
import { Class as NumberClass } from "./Number/Class"
import { Object2 as islyObject } from "./Object"
import { Class as ObjectClass } from "./Object/Class"
import { Optional as islyOptional } from "./Optional"
import { Class as OptionalClass } from "./Optional/Class"
import { Readonly as islyReadonly } from "./Readonly"
import { Class as ReadonlyClass } from "./Readonly/Class"
import { Type as islyType } from "./Type"
import { Undefined as islyUndefined } from "./Undefined"
import { Class as UndefinedClass } from "./Undefined/Class"

export function isly<V = unknown, B extends Base<V, B> = Base<V>>(
	type: "array",
	base: B,
	name?: string
): isly.Array<V, B>
export function isly<V extends boolean = boolean>(type: "boolean", allowed?: V): isly.Boolean<V>
export function isly<V extends number = number>(type: "number"): isly.Number<V>
export function isly<V extends number = number>(type: "number", ...condition: isly.Number.Condition<V>): isly.Number<V>
export function isly<V extends any | undefined = unknown | undefined, B extends Base<V, B> = Base<V>>(
	type: "optional",
	base: B,
	name?: string
): isly.Optional<V, B>
export function isly<V extends any | undefined = unknown | undefined, B extends Base<V, B> = Base<V>>(
	type: "readonly",
	base: B,
	name?: string
): isly.Readonly<V, B>
export function isly<V extends undefined = undefined>(type: "undefined", name?: string): isly.Undefined<V>
export function isly(type: isly.Class, ...properties: any[]): isly.Type {
	const result = (
		{
			array: ArrayClass.create,
			boolean: BooleanClass.create,
			number: NumberClass.create,
			object: ObjectClass.create,
			optional: OptionalClass.create,
			readonly: ReadonlyClass.create,
			undefined: UndefinedClass.create,
		} as Record<isly.Class, (...argument: any[]) => isly.Type>
	)[type](...properties)
	// override methods that otherwise requires circular dependencies
	return Object.assign(result, {
		get definition(): Definition {
			return Definition.create(result)
		},
		array(name?: string): isly.Array {
			return isly("array", result, name)
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
	// Don't export create functions
	export import Array = islyArray
	export import Boolean = islyBoolean
	export import Number = islyNumber
	export import Class = islyClass
	export import Definition = islyDefinition
	export import Object = islyObject
	export import Optional = islyOptional
	export import Readonly = islyReadonly
	export import Type = islyType
	export import Undefined = islyUndefined
}
