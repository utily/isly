import type { Boolean } from "./Boolean"
import type { Optional } from "./Optional"
import type { Readonly } from "./Readonly"
import { Transformer } from "./Transformer"
import type { Type } from "./Type"
import type { Undefined } from "./Undefined"

export type Definition = Boolean.Definition | Optional.Definition | Readonly.Definition | Undefined.Definition
export namespace Definition {
	function base(type: Type): Definition {
		return {
			name: type.name,
			...(type.description ? { description: type.description } : {}),
			...(type.condition ? { condition: type.condition } : {}),
		}
	}
	const transformer = Transformer.create<{ boolean: Boolean.Definition; optional: Optional.Definition }>({
		boolean: (type: Boolean): Boolean.Definition => ({
			...base(type),
			allowed: type.allowed,
		}),
		optional: (type: Optional): Optional.Definition => ({ ...base(type), base: type.base }),
		readonly: (type: Readonly): Readonly.Definition => ({ ...base(type), base: type.base }),
		undefined: (type: Undefined): Undefined.Definition => base(type),
	})
	export function create<T extends Type>(type: T): Definition {
		return transformer.transform(type) as Definition
	}
}
