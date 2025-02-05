import { Base } from "../Base"
import { Flaw } from "../Flaw"
import type { isly } from "../index"
import { Name } from "../Name"

export class Class<V = unknown, B extends Base<V> = Base<V>> extends Base<V> {
	readonly class = "intersection"
	override get definition(): isly.Definition {
		return Object.assign(super.definition, { base: this.base.map(b => b.definition) })
	}
	private constructor(creator: typeof isly, readonly base: B[], readonly name: string = Name.fromIntersection(base)) {
		super(creator, "Intersection of base types.")
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
	static create<V, B extends Base<V>>(creator: typeof isly, ...base: B[]): Class<V, B> {
		return new Class<V, B>(creator, base)
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
