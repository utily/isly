import { Base } from "../Base"
import { Number } from "../Number"
import { String } from "../String"
import { Class } from "./Class"
import { Definition as BaseDefinition } from "./Definition"

export type Record<
	K extends string | number = string,
	KType extends String | Number = String,
	V extends any | undefined = unknown | undefined,
	VType extends Base<V> = Base<V>
> = Omit<Class<K, KType, V, VType>, "constructor">

export namespace Record {
	export import Definition = BaseDefinition
}
