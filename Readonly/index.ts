import { Base } from "../Base"
import { Class } from "./Class"
import { Creator as ReadonlyCreator } from "./Creator"
import { Definition as ReadonlyDefinition } from "./Definition"

export type Readonly<V extends any | undefined = unknown | undefined, B extends Base<V> = Base<V>> = Omit<
	Class<V, B>,
	"constructor"
>

export namespace Readonly {
	export import Creator = ReadonlyCreator
	export import Definition = ReadonlyDefinition
}
