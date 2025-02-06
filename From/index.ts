import { Class } from "./Class"
import { Creator as FromCreator } from "./Creator"
import { Definition as FromDefinition } from "./Definition"

export type From<V = unknown> = Class<V>

export namespace From {
	export import Creator = FromCreator
	export import Definition = FromDefinition
}
