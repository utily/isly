import { Class } from "./Class"
import { Definition as BaseDefinition } from "./Definition"

export type Null<V extends null = null> = Class<V>

export namespace Null {
	export import Definition = BaseDefinition
}
