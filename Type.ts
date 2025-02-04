import type { Any } from "./Any"
import type { Array } from "./Array"
import type { Base } from "./Base"
import type { Boolean } from "./Boolean"
import type { Class } from "./Class"
import type { Function } from "./Function"
import type { Instance } from "./Instance"
import type { Intersection } from "./Intersection"
import type { Null } from "./Null"
import type { Number } from "./Number"
import type { islyObject } from "./Object"
import type { Optional } from "./Optional"
import type { Readonly } from "./Readonly"
import type { Record } from "./Record"
import type { String } from "./String"
import type { Tuple } from "./Tuple"
import type { Undefined } from "./Undefined"
import type { Union } from "./Union"
import type { Unknown } from "./Unknown"

export type Type = Base // Omit<Base, "constructor"> // Array | Boolean | Number | Object | Optional | Readonly | Undefined
export namespace Type {
	export interface FromClass extends globalThis.Record<Class, Type> {
		any: Any
		array: Array
		boolean: Boolean
		// from: Undefined
		function: Function
		instance: Instance
		intersection: Intersection
		null: Null
		number: Number
		object: islyObject
		optional: Optional
		readonly: Readonly
		record: Record
		string: String
		tuple: Tuple
		// type: Type
		undefined: Undefined
		union: Union
		unknown: Unknown
	}
}
