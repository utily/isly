import type { Any } from "./Any"
import type { Array } from "./Array"
import { Base } from "./Base"
import type { Boolean } from "./Boolean"
import type { Function } from "./Function"
import type { Instance } from "./Instance"
import type { Intersection } from "./Intersection"
import type { Number } from "./Number"
import { islyObject } from "./Object"
import { Properties } from "./Object/Properties"
import type { Optional } from "./Optional"
import type { Readonly } from "./Readonly"
import type { Record } from "./Record"
import type { String } from "./String"
import { Transformer } from "./Transformer"
import type { Tuple } from "./Tuple"
import type { Type } from "./Type"
import type { Undefined } from "./Undefined"
import type { Union } from "./Union"
import type { Unknown } from "./Unknown"

export type Definition =
	| Any.Definition
	| Array.Definition
	| Boolean.Definition
	| Function.Definition
	| Instance.Definition
	| Number.Definition
	| Intersection.Definition
	| islyObject.Definition
	| Optional.Definition
	| Readonly.Definition
	| Record.Definition
	| String.Definition
	| Tuple.Definition
	| Undefined.Definition
	| Union.Definition
	| Unknown.Definition
export namespace Definition {
	function base(type: Type): Base.Definition {
		return {
			name: type.name,
			...(type.description ? { description: type.description } : {}),
			...(type.condition ? { condition: type.condition } : {}),
		}
	}
	const transformer = Transformer.create<{
		any: Any.Definition
		array: Array.Definition
		boolean: Boolean.Definition
		function: Function.Definition
		number: Number.Definition
		instance: Instance.Definition
		intersection: Intersection.Definition
		object: islyObject.Definition
		optional: Optional.Definition
		readonly: Readonly.Definition
		record: Record.Definition
		string: String.Definition
		tuple: Tuple.Definition
		undefined: Undefined.Definition
		union: Union.Definition
		unknown: Unknown.Definition
	}>({
		any: (type: Any): Any.Definition => ({ ...base(type) }),
		array: (type: Array): Array.Definition => ({ ...base(type), base: type.base.definition }),
		boolean: (type: Boolean): Boolean.Definition => ({
			...base(type),
			...(type.allowed != undefined ? { allowed: type.allowed } : {}),
		}),
		function: (type: Function): Function.Definition => ({ ...base(type) }),
		number: (type: Number): Number.Definition => ({
			...base(type),
			...(type.allowed ? { allowed: [...type.allowed] } : {}),
		}),
		instance: (type: Instance): Instance.Definition => ({
			...base(type),
		}),
		intersection: (type: Intersection): Intersection.Definition => ({
			...base(type),
			base: type.base.map(b => b.definition),
		}),
		object: (type: islyObject): islyObject.Definition => ({
			...base(type),
			properties: globalThis.Object.fromEntries(
				Properties.entries(type.properties).map(([p, t]) => [p, transformer.transform(t)])
			),
		}),
		optional: (type: Optional): Optional.Definition => ({ ...base(type), base: type.base.definition }),
		readonly: (type: Readonly): Readonly.Definition => ({ ...base(type), base: type.base.definition }),
		record: (type: Record): Record.Definition => ({
			...base(type),
			key: type.key.definition as String.Definition | Number.Definition,
			value: type.value.definition,
		}),
		string: (type: String): String.Definition => ({
			...base(type),
			...(type.allowed != undefined ? { allowed: type.allowed } : {}),
		}),
		tuple: (type: Tuple): Tuple.Definition => ({ ...base(type), base: type.base.map(b => b.definition) }),
		undefined: (type: Undefined): Undefined.Definition => ({ ...base(type) }),
		union: (type: Union): Union.Definition => ({ ...base(type), base: type.base.map(b => b.definition) }),
		unknown: (type: Unknown): Unknown.Definition => ({ ...base(type) }),
	})
	export function create<T extends Type>(type: T): Definition {
		return transformer.transform(type) as Definition
	}
}
