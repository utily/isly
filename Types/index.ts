import { Any } from "../Any"
// import { Array } from "../Array"
import { Boolean } from "../Boolean"
import { Class } from "../Class"
import { From } from "../From"
import { Function } from "../Function"
import { Instance } from "../Instance"
import { Intersection } from "../Intersection"
import { Null } from "../Null"
import { Number } from "../Number"
import { Object } from "../Object"
//import { Optional } from "../Optional"
// import { Readonly } from "../Readonly"
import { Record } from "../Record"
import { String } from "../String"
import { Tuple } from "../Tuple"
import { Type } from "../Type"
import { Undefined } from "../Undefined"
import { Union } from "../Union"
import { Unknown } from "../Unknown"

export interface Types extends Record<Class, Type> {
	any: Any
	// array: Array
	boolean: Boolean
	from: From
	function: Function
	instance: Instance
	intersection: Intersection
	null: Null
	number: Number
	object: Object
	// optional: Type<any>
	// readonly: Readonly
	record: Record
	string: String
	tuple: Tuple
	type: Type
	undefined: Undefined
	union: Union
	unknown: Unknown
}
