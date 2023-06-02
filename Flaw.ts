import { boolean } from "./boolean"
import { lazy } from "./lazy"
import { object } from "./object"
import { string } from "./string"
import { array, Type } from "./Type"

export interface Flaw {
	message?: string
	isFlaw?: boolean
	property?: string
	type: string
	condition?: string
	flaws?: Flaw[]
}

export namespace Flaw {
	export const type: Type<Flaw> = object<Flaw>(
		{
			message: string().optional(),
			isFlaw: boolean().optional(),
			property: string().optional(),
			type: string(),
			flaws: array(lazy(() => type)).optional(),
			condition: string().optional(),
		},
		"Flaw"
	)
	export const is = type.is
	export const flaw = type.flaw
}
