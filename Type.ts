import { Any } from "./Any"
import { Array } from "./Array"
import { Base } from "./Base"
import { Boolean } from "./Boolean"
import { Class } from "./Class"
import { Number } from "./Number"
import { islyObject } from "./Object"
import { Optional } from "./Optional"
import { Readonly } from "./Readonly"
import { String } from "./String"
import { Undefined } from "./Undefined"
import { Union } from "./Union"

export type Type = Base // Omit<Base, "constructor"> // Array | Boolean | Number | Object | Optional | Readonly | Undefined
export namespace Type {
	export interface FromClass extends Record<Class, Type> {
		any: Any
		array: Array
		boolean: Boolean
		// from: Undefined
		// function: Undefined
		// instance: Undefined
		// intersection: Undefined
		// null: Undefined
		number: Number
		object: islyObject
		optional: Optional
		readonly: Readonly
		// record: Undefined
		string: String
		// tuple: Undefined
		// type: Type
		undefined: Undefined
		union: Union
		// unknown: Undefined
	}
}
