import { Base } from "../Base"
import { Class } from "./Class"
import { Definition as BaseDefinition } from "./Definition"

export type Intersection<V = unknown, B extends Base<V> = Base<V>> = Omit<Class<V, B>, "constructor">

export namespace Intersection {
	export import Definition = BaseDefinition
}
