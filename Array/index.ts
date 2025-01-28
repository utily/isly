import { Base } from "../Base"
import { Condition as ArrayCondition } from "./Condition"
import { Definition as ArrayDefinition } from "./Definition"

export class Array<V = unknown, B extends Base<V, B> = Base<V>> extends Base<V[], Array<V, B>> {
	readonly class = "array"
	override readonly name: string
	private constructor(readonly base: B, name?: string) {
		name = name ?? `${base.name}[]`
		super(`Array of ${name}.`)
		this.name = name
	}
	is(value: V[] | any): value is V[] {
		return globalThis.Array.isArray(value) && value.every(this.base.is)
	}
	// restrict(...condition: Array.Condition): Array<V, B> {
	// 	return Array.Condition.restrict(this, ...condition)
	// }
	static create<V = unknown, B extends Base<V, B> = Base<V>>(base: B, name?: string): Array<V, B> {
		return Base.bind(new Array<V, B>(base, name))
	}
}
export namespace Array {
	export import Condition = ArrayCondition
	export import Definition = ArrayDefinition
	export type BaseType<A> = A extends globalThis.Array<infer U> ? U : never
}
