import { Base } from "../Base"
import type { isly } from "../index"

export class Class<V extends any | undefined = unknown | undefined, B extends Base<V> = Base<V>> extends Base<V> {
	readonly class = "readonly"
	override get definition(): isly.Definition {
		return Object.assign(super.definition, { base: this.base.definition })
	}
	private constructor(creator: isly.Creator, readonly base: B, readonly name: string = `Readonly<${base.name}>`) {
		super(creator, "Readonly version of base type.")
	}
	override is(value: V | any): value is V {
		return value === undefined || this.base.is(value)
	}
	override prune(value: V | any): V | undefined {
		return this.base.prune(value)
	}
	static create<V extends any | undefined = unknown | undefined, B extends Base<V> = Base<V>>(
		creator: isly.Creator,
		base: B,
		name?: string
	): Class<V, B> {
		return new Class<V, B>(creator, base, name)
	}
}
