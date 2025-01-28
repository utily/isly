import { Base } from "../Base"
import { Class } from "./Class"
import { Condition as NumberCondition } from "./Condition"
import { Definition as NumberDefinition } from "./Definition"

export type Number<V extends number = number> = Class<V>
Base.register("number", Class.create)

export namespace Number {
	export type Definition = NumberDefinition
	export import Condition = NumberCondition
}
