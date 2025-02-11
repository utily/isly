import { Class } from "./Class"
import { Definition as StringDefinition } from "./Definition"
import { Restriction as StringRestriction } from "./Restriction"

export type String<V extends string = string> = Class<V>
export namespace String {
	export import Definition = StringDefinition
	export import Restriction = StringRestriction
}
