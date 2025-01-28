import { Base } from "../Base"
import { Class } from "./Class"
import { Definition as BaseDefinition } from "./Definition"

export type Readonly<V extends any | undefined = unknown | undefined, B extends Base<V, B> = Base<V>> = Class<V, B>

export namespace Readonly {
	export import Definition = BaseDefinition
}
