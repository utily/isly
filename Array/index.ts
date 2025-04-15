import { Class } from "./Class"
import { Definition as ArrayDefinition } from "./Definition"
import { Restriction as ArrayRestriction } from "./Restriction"

export type Array<V> = Omit<Class<V>, "constructor">

export namespace Array {
	export import Restriction = ArrayRestriction
	export import Definition = ArrayDefinition
}
