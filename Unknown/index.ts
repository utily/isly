import { Class } from "./Class"
import { Creator as UnknownCreator } from "./Creator"
import { Definition as UnknownDefinition } from "./Definition"

export type Unknown<V = unknown> = Class<V>

export namespace Unknown {
	export import Creator = UnknownCreator
	export import Definition = UnknownDefinition
}
