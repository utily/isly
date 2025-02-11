import { Class } from "./Class"
import { Definition as BaseDefinition } from "./Definition"

export type Any<V = any> = Class<V>

export namespace Any {
	export import Definition = BaseDefinition
}
