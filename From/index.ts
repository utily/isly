import { Class } from "./Class"
import { Definition as BaseDefinition } from "./Definition"

export type From<V = unknown> = Class<V>

export namespace From {
	export import Definition = BaseDefinition
}
