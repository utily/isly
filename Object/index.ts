import { Class } from "./Class"
import { Definition as ObjectDefinition } from "./Definition"
import { Properties as ObjectProperties } from "./Properties"

export type _Object<V extends object = Record<string, any>> = Omit<Class<V>, "constructor">

export namespace _Object {
	export import Definition = ObjectDefinition
	export import Properties = ObjectProperties
}
