import { Base } from "../Base"
import { Class } from "./Class"
import { Condition as ArrayCondition } from "./Condition"
import { Definition as ArrayDefinition } from "./Definition"

export type Array<V = unknown, B extends Base<V, B> = Base<V>> = Class<V, B>

export namespace Array {
	export import Condition = ArrayCondition
	export import Definition = ArrayDefinition
	export type BaseType<A> = A extends globalThis.Array<infer U> ? U : never
}
