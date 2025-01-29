import { Class } from "./Class"
import { Condition as StringCondition } from "./Condition"
import { Definition as StringDefinition } from "./Definition"

export type String<V extends string = string> = Class<V>
export namespace String {
	export import Definition = StringDefinition
	export import Condition = StringCondition
}
