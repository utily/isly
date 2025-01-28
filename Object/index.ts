import { Class } from "./Class"
import { Definition as ObjectDefinition } from "./Definition"
import { Properties as ObjectProperties } from "./Properties"

export type Object2<V extends object = Record<string, any>> = Omit<Class<V>, "constructor">

export namespace Object2 {
	export import Definition = ObjectDefinition
	export import Properties = ObjectProperties
}
