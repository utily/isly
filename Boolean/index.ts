import { Class } from "./Class"
import { Creator as BooleanCreator } from "./Creator"
import { Definition as BooleanDefinition } from "./Definition"

export type Boolean<V extends boolean = boolean> = Omit<Class<V>, "constructor">

export namespace Boolean {
	export import Creator = BooleanCreator
	export import Definition = BooleanDefinition
}
