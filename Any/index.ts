import { Class } from "./Class"
import { Creator as AnyCreator } from "./Creator"
import { Definition as AnyDefinition } from "./Definition"

export type Any<V = any> = Class<V>

export namespace Any {
	export import Creator = AnyCreator
	export import Definition = AnyDefinition
}
