import { Base } from "../Base"
import { Flaw } from "../Flaw"
import type { isly } from "../index"
import { Name } from "../Name"

export class Class<V = unknown, B extends Base<V> = Base<V>> extends Base<V> {
	readonly class = "union"
	override get definition(): isly.Definition {
		return Object.assign(super.definition, { base: this.base.map(b => b.definition) })
	}
	private constructor(readonly base: B[], readonly name: string = Name.fromUnion(base)) {
		super()
	}
	override is(value: V | any): value is V {
		return this.base.some(b => b.is(value))
	}
	override prune(value: V | any): V | undefined {
		return this.base
			.map(b => b.prune(value))
			.filter((v: V | any): v is V => v !== undefined)
			.reduce((r, v) => globalThis.Object.assign(r, v), {}) as V
	}
	override flawed(value: V | any): Flaw | false {
		const result: Flaw | false = super.flawed(value)
		return (
			result && {
				...result,
				flaws: this.base.map(t => t.flawed(value)).filter((v: Flaw | any): v is Flaw => v != false),
			}
		)
	}
	static create<T extends A | B, A, B>(...types: [Base<A>, Base<B>]): isly.Union<T>
	static create<T extends A | B | C, A, B, C>(...types: [Base<A>, Base<B>, Base<C>]): isly.Union<T>
	static create<T extends A | B | C | D, A, B, C, D>(...types: [Base<A>, Base<B>, Base<C>, Base<D>]): isly.Union<T>
	static create<T extends A | B | C | D | E, A, B, C, D, E>(
		...types: [Base<A>, Base<B>, Base<C>, Base<D>, Base<E>]
	): isly.Union<T>
	static create<T extends A | B | C | D | E | F, A, B, C, D, E, F>(
		...types: [Base<A>, Base<B>, Base<C>, Base<D>, Base<E>, Base<F>]
	): isly.Union<T>
	static create<V>(...types: Base<V>[]): isly.Union<V>
	static create<V, B extends Base<V>>(...base: B[]): Class<V, B> {
		return new Class<V, B>(base).modify()
	}
}
