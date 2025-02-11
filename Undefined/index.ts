import { Class } from "./Class"
import { Definition as BaseDefinition } from "./Definition"

export type Undefined<V extends undefined = undefined> = Class<V>

export namespace Undefined {
	export import Definition = BaseDefinition
}
