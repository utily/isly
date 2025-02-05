import { Base } from "../Base"
import { Flaw } from "../Flaw"
import type { isly } from "../index"
import { Name } from "../Name"
import { Restriction } from "./Restriction"

export class Class<V, B extends Base<V>> extends Base<V[]> {
	readonly class = "array"
	override readonly name: string
	override get definition(): isly.Definition {
		return Object.assign(super.definition, { base: this.base.definition })
	}
	private constructor(creator: typeof isly, readonly base: B, name?: string) {
		name = name ?? Name.fromArray(base)
		super(creator, `Array of ${name}.`)
		this.name = name
	}
	override is(value: V[] | any): value is V[] {
		return globalThis.Array.isArray(value) && value.every(this.base.is.bind(this.base))
	}
	override flawed(value: V[] | any): Flaw | false {
		const result: Flaw | false = super.flawed(value)
		return (
			result && {
				...result,
				flaws: (Array.isArray(value)
					? value.map(this.base.flawed.bind(this.base)).map((flaw, index) => flaw && { ...flaw, index })
					: [this.base.flawed(undefined)]
				).filter((f: Flaw | false): f is Flaw => !!f),
			}
		)
	}
	override prune(value: V[] | any): V[] | undefined {
		return this.is(value) ? (value.map(this.base.prune.bind(this.base)) as V[]) : undefined
	}
	override restrict(...restriction: Restriction | Base.Restriction) {
		return super.restrict(...(Base.Restriction.is(restriction) ? restriction : Restriction.convert(restriction)))
	}
	static create<V = unknown, B extends Base<V> = Base<V>>(
		creator: typeof isly,
		base: B,
		...restriction: [] | Restriction | Base.Restriction
	): Class<V, B> {
		const result: Class<V, B> = new Class<V, B>(creator, base)
		return ((value: any): value is [] => Array.isArray(value) && value.length == 0)(restriction)
			? result
			: result.restrict(...restriction)
	}
}
