import { Class } from "./Class"
import { Definition as FromDefinition } from "./Definition"

export type From<V = unknown> = Class<V>

export namespace From {

	export import Definition = FromDefinition
}
