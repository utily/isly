import { Boolean } from "./Boolean"
import { Class } from "./Class"
import { Optional } from "./Optional"
import { Readonly } from "./Readonly"
import { Undefined } from "./Undefined"

export type Type = Boolean | Optional | Readonly | Undefined
export namespace Type {
	export interface FromClass extends Record<Class, Type> {
		// any: Undefined
		// array: Undefined
		boolean: Boolean
		// from: Undefined
		// function: Undefined
		// instance: Undefined
		// intersection: Undefined
		// null: Undefined
		// number: Undefined
		// object: Undefined
		optional: Optional
		readonly: Readonly
		// record: Undefined
		// string: Undefined
		// tuple: Undefined
		// type: Type
		undefined: Undefined
		// union: Undefined
		// unknown: Undefined
	}
}
