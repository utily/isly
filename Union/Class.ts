import { Base } from "../Base"
import { Flaw } from "../Flaw"
import type { isly } from "../index"
import { Name } from "../Name"

export class Class<V = unknown, B extends Base<V> = Base<V>> extends Base<V> {
	readonly class = "union"
	#name: string | undefined
	get name(): string {
		return (this.#name ??= Name.fromUnion(this.base))
	}
	override get definition(): isly.Definition {
		return Object.assign(super.definition, { base: this.base.map(b => b.definition) })
	}
	private constructor(readonly base: B[], name?: string) {
		super()
		this.#name = name
	}
	override is(value: V | any): value is V {
		return this.base.some(b => b.is(value))
	}
	override prune(value: V | any): V | undefined {
		let result: V | undefined = undefined
		for (const base of this.base)
			if ((result = base.prune(value)))
				break
		return result
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
		return new Class<V, B>(base)
	}
}
