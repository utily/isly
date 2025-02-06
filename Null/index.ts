import { Class } from "./Class"
import { Creator as NullCreator } from "./Creator"
import { Definition as NullDefinition } from "./Definition"

export type Null<V extends null = null> = Class<V>

export namespace Null {
	export import Creator = NullCreator
	export import Definition = NullDefinition
}
