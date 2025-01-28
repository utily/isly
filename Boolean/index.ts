import { Class } from "./Class"
import { Definition as BaseDefinition } from "./Definition"

export type Boolean<V extends boolean = boolean> = Omit<Class<V>, "constructor">

export namespace Boolean {
	export import Definition = BaseDefinition
}
