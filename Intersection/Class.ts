import { Base } from "../Base"
import { Flaw } from "../Flaw"
import type { isly } from "../index"
import { Name } from "../Name"

export class Class<V = unknown, B extends Base<V> = Base<V>> extends Base<V> {
	readonly class = "intersection"
	#name: string | undefined
	get name(): string {
		return (this.#name ??= Name.fromIntersection(this.base))
	}
	override get definition(): isly.Definition {
		return Object.assign(super.definition, { base: this.base.map(b => b.definition) })
	}
	private constructor(readonly base: B[], name?: string) {
		super()
		this.#name = name
	}
	override is(value: V | any): value is V {
		return this.base.every(b => b.is(value))
	}
	override prune(value: V | any): V | undefined {
		return !this.is(value)
			? undefined
			: value && typeof value == "object"
			? (this.base.reduce((r, b) => merge(r, b.prune(value)), {}) as V)
			: value
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
	static create<T extends A & B, A, B>(typeA: Base<A>, typeB: Base<B>): isly.Intersection<T>
	static create<T extends A & B & C, A, B, C>(typeA: Base<A>, typeB: Base<B>, typeC: Base<C>): isly.Intersection<T>
	static create<T extends A & B & C, A, B, C>(typeA: Base<A>, typeB: Base<B>, typeC: Base<C>): isly.Intersection<T>
	static create<T extends A & B & C & D, A, B, C, D>(
		typeA: Base<A>,
		typeB: Base<B>,
		typeC: Base<C>,
		typeD: Base<D>
	): isly.Intersection<T>
	static create<T extends A & B & C & D & E, A, B, C, D, E>(
		typeA: Base<A>,
		typeB: Base<B>,
		typeC: Base<C>,
		typeD: Base<D>,
		typeE: Base<E>
	): isly.Intersection<T>
	static create<T extends A & B & C & D & E & F, A, B, C, D, E, F>(
		typeA: Base<A>,
		typeB: Base<B>,
		typeC: Base<C>,
		typeD: Base<D>,
		typeE: Base<E>,
		typeF: Base<F>
	): isly.Intersection<T>
	static create<V, B extends Base<V>>(...base: B[]): Class<V, B> {
		return new Class<V, B>(base).modify()
	}
}
function merge<T, S>(target: T, source: S): T & S {
	return Array.isArray(target) && Array.isArray(source)
		? (target.map((item, index) => merge(item, source[index])) as S & T)
		: target && typeof target == "object" && source && typeof source == "object"
		? globalThis.Object.fromEntries([
				...globalThis.Object.entries(target),

				...globalThis.Object.entries(source).map(([key, value]) => [
					key,
					globalThis.Object.getOwnPropertyDescriptor(target, key) &&
					typeof target[key as keyof typeof target] == "object" &&
					typeof value == "object"
						? merge(target[key as keyof typeof target], value)
						: value,
				]),
		  ])
		: (target as T & S)
}
