import { array } from "./array"
import { boolean } from "./boolean"
import { lazy } from "./lazy"
import { number } from "./number"
import { object } from "./object"
import { optional } from "./optional"
import { string } from "./string"
import { Type } from "./Type"
import { union } from "./union"

export interface Flaw {
	message?: string
	isFlaw?: boolean
	property?: string | number
	type: string
	condition?: string
	flaws?: Flaw[]
}
// Different alternatives for export of a type:

// export const Flaw: Type<Flaw> = object<Flaw>(
// 	{
// 		message: optional(string()),
// 		isFlaw: optional(boolean()),
// 		property: optional(union(string(), number())),
// 		type: string(),
// 		flaws: optional(array(lazy(() => Flaw))),
// 		condition: optional(string()),
// 	},
// 	"Flaw"
// )

export namespace Flaw {
	export const type: Type<Flaw> = object<Flaw>(
		{
			message: optional(string()),
			isFlaw: optional(boolean()),
			property: optional(union(string(), number())),
			type: string(),
			flaws: optional(array(lazy(() => type))),
			condition: optional(string()),
		},
		"Flaw"
	)
	export const is = type.is
	export const flaw = type.flaw
}
