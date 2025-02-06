import { Class } from "./Class"
import { Definition as AnyDefinition } from "./Definition"

export type Any<V = any> = Class<V>

export namespace Any {
	export import Definition = AnyDefinition
}
