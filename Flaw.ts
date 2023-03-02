import { array } from "./array"
import { boolean } from "./boolean"
import { lazy } from "./lazy"
import { number } from "./number"
import { object } from "./object"
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

export namespace Flaw {
	export const type: Type<Flaw> = object<Flaw>(
		{
			message: string().optional(),
			isFlaw: boolean().optional(),
			property: union(string(), number()).optional(),
			type: string(),
			flaws: array(lazy(() => type)).optional(),
			condition: string().optional(),
		},
		"Flaw"
	)
	export const is = type.is
	export const flaw = type.flaw
}
