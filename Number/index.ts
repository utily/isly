import { Class } from "./Class"
import { Condition as NumberCondition } from "./Condition"
import { Definition as NumberDefinition } from "./Definition"

export type Number<V extends number = number> = Class<V>
export namespace Number {
	export type Definition = NumberDefinition
	export import Condition = NumberCondition
}
