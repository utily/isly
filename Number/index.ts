import { Class } from "./Class"
import { Definition as NumberDefinition } from "./Definition"
import { Restriction as NumberRestriction } from "./Restriction"

export type Number<V extends number = number> = Class<V>
export namespace Number {
	export type Definition = NumberDefinition
	export import Restriction = NumberRestriction
}
