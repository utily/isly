import { Array as islyArray } from "./Array"
import { Base } from "./Base"
import { Boolean as islyBoolean } from "./Boolean"
import { Class as islyClass } from "./Class"
import { Definition, Definition as islyDefinition } from "./Definition"
import { Number as islyNumber } from "./Number"
import { Object as islyObject } from "./Object"
import { Optional as islyOptional } from "./Optional"
import { Readonly as islyReadonly } from "./Readonly"
import { Type as islyType } from "./Type"
import { Undefined as islyUndefined } from "./Undefined"

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
	const result = Base.instantiate(type, ...properties)!
	// override methods that otherwise requires circular dependencies
	;(result as any).array = (name?: string): isly.Array => Base.instantiate("array", name) as isly.Array
	;(result as any).optional = (name?: string): isly.Optional => Base.instantiate("optional", name) as isly.Optional
	;(result as any).readonly = (name?: string): isly.Readonly => Base.instantiate("readonly", name) as isly.Readonly
	return Object.assign(result, {
		get definition(): Definition {
			return Definition.create(result)
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
