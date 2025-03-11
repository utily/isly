import type { Any } from "./Any"
import type { Array } from "./Array"
import type { Base } from "./Base"
import type { Boolean } from "./Boolean"
import type { From } from "./From"
import type { Function } from "./Function"
import type { Instance } from "./Instance"
import type { Intersection } from "./Intersection"
import type { Inverse } from "./Inverse"
import type { Lazy } from "./Lazy"
import type { Null } from "./Null"
import type { Number } from "./Number"
import type { _Object } from "./Object"
import type { Optional } from "./Optional"
import type { Readonly } from "./Readonly"
import type { Record } from "./Record"
import type { String } from "./String"
import type { Tuple } from "./Tuple"
import type { Undefined } from "./Undefined"
import type { Union } from "./Union"
import type { Unknown } from "./Unknown"

export type Type<V = unknown> = Omit<Base<V>, "constructor">
export namespace Type {
	export interface FromClass {
		any: Any
		array: Array
		boolean: Boolean
		from: From
		function: Function
		instance: Instance
		intersection: Intersection
		inverse: Inverse
		lazy: Lazy
		null: Null
		number: Number
		object: _Object
		optional: Optional
		readonly: Readonly
		record: Record
		string: String
		tuple: Tuple
		undefined: Undefined
		union: Union
		unknown: Unknown
	}
}
