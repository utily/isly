import { Base } from "../Base"

export class Class<V = unknown, B extends Base<V> = Base<V>> extends Base<V> {
	readonly class = "union"
	private constructor(readonly base: B[], readonly name: string = base.map(b => b.name).join(" | ")) {
		super("Union of base types.")
	}
	override is(value: V | any): value is V {
		return this.base.some(b => b.is(value))
	}
	override extract(value: V | any): V | undefined {
		return this.base.find(b => b.is(value))?.extract(value)
	}
	static create<V, B extends Base<V>>(...base: B[]): Class<V, B> {
		return new Class<V, B>(base)
	}
}
