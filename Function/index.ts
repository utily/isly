import { Class } from "./Class"
import { Creator as FunctionCreator } from "./Creator"
import { Definition as FunctionDefinition } from "./Definition"

export type Function<V extends globalThis.Function = globalThis.Function> = Class<V>

export namespace Function {
	export import Creator = FunctionCreator
	export import Definition = FunctionDefinition
}
