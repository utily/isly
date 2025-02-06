import { Class } from "./Class"
import { Creator as InstanceCreator } from "./Creator"
import { Definition as InstanceDefinition } from "./Definition"

export type Instance<V extends object = object> = Omit<Class<V>, "constructor">

export namespace Instance {
	export import Creator = InstanceCreator
	export import Definition = InstanceDefinition
}
