import { Base } from "../Base"
import { Flaw } from "../Flaw"
import { Name } from "../Name"

export class Class<V = unknown, B extends Base<V> = Base<V>> extends Base<V> {
	readonly class = "union"
	private constructor(readonly base: B[], readonly name: string = Name.fromUnion(base)) {
		super("Union of base types.")
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
	static create<V, B extends Base<V>>(...base: B[]): Class<V, B> {
		return new Class<V, B>(base)
	}
}
