import { Base } from "../Base"

export class Class<V, B extends Base<V, B>> extends Base<V[], Class<V, B>> {
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
	static create<V = unknown, B extends Base<V, B> = Base<V>>(base: B, name?: string): Class<V, B> {
		return Base.bind(new Class<V, B>(base, name))
	}
}
