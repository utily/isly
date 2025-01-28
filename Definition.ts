import { Base } from "Base"
import type { Array } from "./Array"
import type { Boolean } from "./Boolean"
import type { Number } from "./Number"
import type { Optional } from "./Optional"
import type { Readonly } from "./Readonly"
import { Transformer } from "./Transformer"
import type { Type } from "./Type"
import type { Undefined } from "./Undefined"

export type Definition =
	| Array.Definition
	| Boolean.Definition
	| Number.Definition
	| Optional.Definition
	| Readonly.Definition
	| Undefined.Definition
export namespace Definition {
	function base(type: Type): Base.Definition {
		return {
			name: type.name,
			...(type.description ? { description: type.description } : {}),
			...(type.condition ? { condition: type.condition } : {}),
		}
	}
	const transformer = Transformer.create<{
		array: Array.Definition
		boolean: Boolean.Definition
		number: Number.Definition
		optional: Optional.Definition
		readonly: Readonly.Definition
		undefined: Undefined.Definition
	}>({
		array: (type: Array): Array.Definition => ({ ...base(type), base: transformer.transform(type.base) }),
		boolean: (type: Boolean): Boolean.Definition => ({
			...base(type),
			...(type.allowed != undefined ? { allowed: type.allowed } : {}),
		}),
		number: (type: Number): Number.Definition => ({
			...base(type),
			...(type.allowed ? { allowed: [...type.allowed] } : {}),
		}),
		optional: (type: Optional): Optional.Definition => ({ ...base(type), base: transformer.transform(type.base) }),
		readonly: (type: Readonly): Readonly.Definition => ({ ...base(type), base: transformer.transform(type.base) }),
		undefined: (type: Undefined): Undefined.Definition => ({ ...base(type) }),
	})
	export function create<T extends Type>(type: T): Definition {
		return transformer.transform(type) as Definition
	}
}
