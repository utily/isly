import { Class } from "./Class"
import { Restriction as NumberCondition } from "./Restriction"
import { Definition as NumberDefinition } from "./Definition"

export type Number<V extends number = number> = Class<V>
export namespace Number {
	export type Definition = NumberDefinition
	export import Restriction = NumberCondition
}
