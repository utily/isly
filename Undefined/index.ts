import { Class } from "./Class"
import { Creator as UndefinedCreator } from "./Creator"
import { Definition as BaseDefinition } from "./Definition"

export type Undefined<V extends undefined = undefined> = Class<V>

export namespace Undefined {
	export import Creator = UndefinedCreator
	export import Definition = BaseDefinition
}
