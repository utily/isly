import { Array as islyArray } from "./Array"
import { Base } from "./Base"
import { Boolean as islyBoolean } from "./Boolean"
import { Class as islyClass } from "./Class"
import { Definition, Definition as islyDefinition } from "./Definition"
import { Number as islyNumber } from "./Number"
import { Object2 as islyObject } from "./Object"
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
	const result = (
		{
			array: islyArray.create,
			boolean: islyBoolean.create,
			number: islyNumber.create,
			object: islyObject.create,
			optional: islyOptional.create,
			readonly: islyReadonly.create,
			undefined: islyUndefined.create,
		} as unknown as Record<isly.Class, (...argument: any[]) => isly.Type>
	)[type](...properties)
	// override methods that otherwise requires circular dependencies
	;(result as any).array = (name?: string): isly.Array => islyArray.create(result, name)
	;(result as any).optional = (name?: string): isly.Optional => islyOptional.create(result, name)
	;(result as any).readonly = (name?: string): isly.Readonly => islyReadonly.create(result, name)
	return Object.assign(result, {
		get definition(): Definition {
			return Definition.create(result)
		},
	})
}

export namespace isly {
	// Don't export create functions
	export import Array = islyArray
	export type Boolean<V extends boolean = boolean> = islyBoolean<V>
	export import Number = islyNumber
	export import Class = islyClass
	export import Definition = islyDefinition
	export type Optional<
		V extends any | undefined = unknown | undefined,
		B extends Base<V, B> = Base<V, any>
	> = islyOptional<V, B>
	export type Readonly<
		V extends any | undefined = unknown | undefined,
		B extends Base<V, B> = Base<V, any>
	> = islyReadonly<V, B>
	export import Type = islyType
	export type Undefined<V extends undefined = undefined> = islyUndefined<V>
}
