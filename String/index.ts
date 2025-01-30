import { Class } from "./Class"
import { Restriction as StringCondition } from "./Restriction"
import { Definition as StringDefinition } from "./Definition"

export type String<V extends string = string> = Class<V>
export namespace String {
	export import Definition = StringDefinition
	export import Condition = StringCondition
}
