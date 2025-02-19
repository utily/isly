import type { Any } from "../Any"
import type { Array } from "../Array"
import type { Boolean } from "../Boolean"
import type { From } from "../From"
import type { Function } from "../Function"
import type { Instance } from "../Instance"
import type { Intersection } from "../Intersection"
import type { Lazy } from "../Lazy"
import type { Null } from "../Null"
import type { Number } from "../Number"
import type { _Object } from "../Object"
import type { Optional } from "../Optional"
import type { Readonly } from "../Readonly"
import type { Record } from "../Record"
import type { String } from "../String"
import type { Tuple } from "../Tuple"
import type { Undefined } from "../Undefined"
import type { Union } from "../Union"
import type { Unknown } from "../Unknown"
import { Transformer as _Transformer } from "./Transformer"

export type Definition =
	| Any.Definition
	| Array.Definition
	| Boolean.Definition
	| From.Definition
	| Function.Definition
	| Instance.Definition
	| Number.Definition
	| Intersection.Definition
	| Lazy.Definition
	| Null.Definition
	| _Object.Definition
	| Optional.Definition
	| Readonly.Definition
	| Record.Definition
	| String.Definition
	| Tuple.Definition
	| Undefined.Definition
	| Union.Definition
	| Unknown.Definition
export namespace Definition {
	export import Transformer = _Transformer
	export interface FromClass {
		any: Any
		array: Array
		boolean: Boolean
		from: From
		function: Function
		instance: Instance
		intersection: Intersection
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
