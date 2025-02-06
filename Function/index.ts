import { Class } from "./Class"
import { Definition as FunctionDefinition } from "./Definition"

export type Function<V extends globalThis.Function = globalThis.Function> = Class<V>

export namespace Function {
	export import Definition = FunctionDefinition
}
