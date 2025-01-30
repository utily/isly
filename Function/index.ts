import { Class } from "./Class"
import { Definition as BaseDefinition } from "./Definition"

export type Function<V extends globalThis.Function = globalThis.Function> = Class<V>

export namespace Function {
	export import Definition = BaseDefinition
}
