import { Class } from "./Class"
import { Creator as StringCreator } from "./Creator"
import { Definition as StringDefinition } from "./Definition"
import { Restriction as StringRestriction } from "./Restriction"

export type String<V extends string = string> = Class<V>
export namespace String {
	export import Creator = StringCreator
	export import Definition = StringDefinition
	export import Restriction = StringRestriction
}
