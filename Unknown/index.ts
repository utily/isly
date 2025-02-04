import { Class } from "./Class"
import { Definition as BaseDefinition } from "./Definition"

export type Unknown<V = unknown> = Class<V>

export namespace Unknown {
	export import Definition = BaseDefinition
}
