import { Base } from "../Base"
import { Class } from "./Class"
import { Creator as ArrayCreator } from "./Creator"
import { Definition as ArrayDefinition } from "./Definition"
import { Restriction as ArrayRestriction } from "./Restriction"

export type Array<V = unknown, B extends Base<V> = Base<V>> = Omit<Class<V, B>, "constructor">

export namespace Array {
	export import Creator = ArrayCreator
	export import Definition = ArrayDefinition
	export import Restriction = ArrayRestriction
}
