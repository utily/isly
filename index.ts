import { Base } from "./Base"
import { Boolean as islyBoolean } from "./Boolean"
import { Class as islyClass } from "./Class"
import { Definition, Definition as islyDefinition } from "./Definition"
import { Optional as islyOptional } from "./Optional"
import { Readonly as islyReadonly } from "./Readonly"
import { Type as islyType } from "./Type"
import { Undefined as islyUndefined } from "./Undefined"

export function isly<V extends boolean = boolean>(type: "boolean", allowed?: V): isly.Boolean<V>
export function isly<
	V extends any | undefined = unknown | undefined,
	T extends Base<V, T> = Base<V, any>,
	B extends Base<V, T> = Base<V, any>
>(type: "optional", base: B, name?: string): isly.Optional<V, T, B>
export function isly<
	V extends any | undefined = unknown | undefined,
	T extends Base<V, T> = Base<V, any>,
	B extends Base<V, T> = Base<V, any>
>(type: "readonly", base: B, name?: string): isly.Readonly<V, T, B>
export function isly<V extends undefined = undefined>(type: "undefined", name?: string): isly.Undefined<V>
export function isly(type: isly.Class, ...properties: any[]): isly.Type {
	const result = (
		{
			boolean: islyBoolean.create,
			optional: islyOptional.create,
			readonly: islyReadonly.create,
			undefined: islyUndefined.create,
		} as unknown as Record<isly.Class, (...argument: any[]) => isly.Type>
	)[type](...properties)
	// override methods that otherwise requires circular dependencies
	result.optional = (name?: string): isly.Optional => islyOptional.create(result as Base, name)
	result.readonly = (name?: string): isly.Readonly => islyReadonly.create(result as Base, name)
	return Object.assign(result, {
		get definition(): Definition {
			return Definition.create(result)
		},
	})
}

export namespace isly {
	// Don't export create functions
	export type Boolean<V extends boolean = boolean> = islyBoolean<V>
	export import Class = islyClass
	export import Definition = islyDefinition
	export type Optional<
		V extends any | undefined = unknown | undefined,
		T extends Base<V, T> = Base<V, any>,
		B extends Base<V, T> = Base<V, any>
	> = islyOptional<V, T, B>
	export type Readonly<
		V extends any | undefined = unknown | undefined,
		T extends Base<V, T> = Base<V, any>,
		B extends Base<V, T> = Base<V, any>
	> = islyReadonly<V, T, B>
	export import Type = islyType
	export type Undefined<V extends undefined = undefined> = islyUndefined<V>
}
