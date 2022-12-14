import { array } from "./array"
import { lazy } from "./lazy"
import { number } from "./number"
import { object } from "./object"
import { optional } from "./optional"
import { string } from "./string"
import { Type } from "./Type"
import { union } from "./union"

export interface Flaw {
	property?: string | number
	type: string
	flaws?: Flaw[]
	condition?: string
}

export namespace Flaw {
	export const type: Type<Flaw> = object({
		property: optional(union<string | number>(string(), number())),
		type: string(),
		flaws: optional(array(lazy(() => type))),
		condition: optional(string()),
	})
	export const is = type.is
	export const flaw = type.flaw
}
