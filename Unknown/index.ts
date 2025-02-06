import { Class } from "./Class"
import { Definition as UnknownDefinition } from "./Definition"

export type Unknown<V = unknown> = Class<V>

export namespace Unknown {

	export import Definition = UnknownDefinition
}
