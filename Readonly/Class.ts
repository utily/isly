import { Base } from "../Base"
import type { isly } from "../index"
import type { Readonly } from "."

export class Class<V = unknown, B extends Base<globalThis.Readonly<V>> = Base<globalThis.Readonly<V>>> extends Base<
	globalThis.Readonly<V>
> {
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
		return new Class<V, B>(creator, base, name).modify()
	}
}
export namespace Class {
	export interface Creator {
		<V = unknown, B extends Base<V> = Base<globalThis.Readonly<V>>>(base: B, name?: string): Readonly<V, B>
	}
}
