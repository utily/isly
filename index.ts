import { Base } from "./Base"
import { Boolean as islyBoolean } from "./Boolean"
import { Class as islyClass } from "./Class"
import { Optional as islyOptional } from "./Optional"
import { Readonly as islyReadonly } from "./Readonly"
import { Type as islyType } from "./Type"
import { Undefined as islyUndefined } from "./Undefined"

export function isly<V extends boolean = boolean>(type: "boolean", allowed?: V): isly.Boolean<V>
export function isly<V, B extends isly.Type & Base<V, B>>(type: "optional", base: B, name?: string): isly.Optional<V, B>
export function isly<V, B extends isly.Type & Base<V, B>>(type: "readonly", base: B, name?: string): isly.Readonly<V, B>
export function isly(type: "undefined", name?: string): isly.Undefined
export function isly(type: isly.Class, ...properties: any[]): isly.Type {
	const result = (
		{
			boolean: isly.Boolean.create,
			optional: isly.Optional.create,
			readonly: isly.Readonly.create,
			undefined: isly.Undefined.create,
		} as unknown as Record<isly.Class, (...argument: any[]) => isly.Type>
	)[type](...properties)
	result.is = result.is.bind(result) // make is reassignable
	return result
}

export namespace isly {
	export import Boolean = islyBoolean
	export import Class = islyClass
	export import Optional = islyOptional
	export import Readonly = islyReadonly
	export import Type = islyType
	export import Undefined = islyUndefined
}
