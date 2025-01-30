import { Base } from "../Base"

export class Class<V extends any | undefined = unknown | undefined, B extends Base<V> = Base<V>> extends Base<V> {
	readonly class = "readonly"
	private constructor(readonly base: B, readonly name: string = `Readonly<${base.name}>`) {
		super("Readonly version of base type.")
	}
	override is(value: V | any): value is V {
		return value === undefined || this.base.is(value)
	}
	override prune(value: V | any): V | undefined {
		return this.base.prune(value)
	}
	static create<V extends any | undefined = unknown | undefined, B extends Base<V> = Base<V>>(
		base: B,
		name?: string
	): Class<V, B> {
		return new Class<V, B>(base, name)
	}
}
