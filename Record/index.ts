import { Base } from "../Base"
import { Class } from "./Class"
import { Definition as BaseDefinition } from "./Definition"

export type Record<
	V extends globalThis.Record<string | number | symbol, any> = globalThis.Record<string, any>,
	KType extends Base<keyof V> = Base<keyof V>,
	VType extends Base<V[keyof V]> = Base<V[keyof V]>
> = Omit<Class<V, KType, VType>, "constructor">

export namespace Record {
	export import Definition = BaseDefinition
}
