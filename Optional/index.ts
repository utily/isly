import { Base } from "../Base"
import { Class } from "./Class"
import { Creator as OptionalCreator } from "./Creator"
import { Definition as OptionalDefinition } from "./Definition"

export type Optional<V = unknown, B extends Base<V> = Base<V>> = Omit<Class<V, B>, "constructor">

export namespace Optional {
	export import Creator = OptionalCreator
	export import Definition = OptionalDefinition
}
