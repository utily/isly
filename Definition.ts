import type { Any } from "./Any"
import type { Array } from "./Array"
import type { Boolean } from "./Boolean"
import type { Function } from "./Function"
import type { Instance } from "./Instance"
import type { Intersection } from "./Intersection"
import type { Number } from "./Number"
import { _Object } from "./Object"
import type { Optional } from "./Optional"
import type { Readonly } from "./Readonly"
import type { Record } from "./Record"
import type { String } from "./String"
import type { Tuple } from "./Tuple"
import type { Undefined } from "./Undefined"
import type { Union } from "./Union"
import type { Unknown } from "./Unknown"

export type Definition =
	| Any.Definition
	| Array.Definition
	| Boolean.Definition
	| Function.Definition
	| Instance.Definition
	| Number.Definition
	| Intersection.Definition
	| _Object.Definition
	| Optional.Definition
	| Readonly.Definition
	| Record.Definition
	| String.Definition
	| Tuple.Definition
	| Undefined.Definition
	| Union.Definition
	| Unknown.Definition
export namespace Definition {}
