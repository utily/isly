import { Base } from "../Base"
import { Class } from "./Class"
import { Definition as BaseDefinition } from "./Definition"

export type Lazy<V extends any | undefined = unknown | undefined, B extends Base<V> = Base<V>> = Omit<
	Class<V, B>,
	"constructor"
>

export namespace Lazy {
	export import Definition = BaseDefinition
}
