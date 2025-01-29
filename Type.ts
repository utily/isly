import { Base } from "Base"
import { Array } from "./Array"
import { Boolean } from "./Boolean"
import { Class } from "./Class"
import { Number } from "./Number"
import { Object2 } from "./Object"
import { Optional } from "./Optional"
import { Readonly } from "./Readonly"
import { String } from "./String"
import { Undefined } from "./Undefined"
import { Union } from "./Union"

export type Type = Base // Omit<Base, "constructor"> // Array | Boolean | Number | Object2 | Optional | Readonly | Undefined
export namespace Type {
	export interface FromClass extends Record<Class, Type> {
		// any: Undefined
		array: Array
		boolean: Boolean
		// from: Undefined
		// function: Undefined
		// instance: Undefined
		// intersection: Undefined
		// null: Undefined
		number: Number
		object: Object2
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
