import { Class } from "./Class"
import { Definition as BaseDefinition } from "./Definition"

export type Instance<V extends object = object> = Omit<Class<V>, "constructor">

export namespace Instance {
	export import Definition = BaseDefinition
}
