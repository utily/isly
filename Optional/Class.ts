import { Base } from "../Base"
import type { isly } from "../index"
import type { Optional } from "."

export class Class<V, B extends Base<V>> extends Base<V | undefined> {
	readonly class = "optional"
	override get definition(): isly.Definition {
		return Object.assign(super.definition, { base: this.base.definition })
	}
	private constructor(creator: isly.Creator, readonly base: B, readonly name: string = `${base.name} | undefined`) {
		super(creator, "Value is optional i.e. undefined or base type.")
	}
	override is(value: V | undefined | any): value is V | undefined {
		return value === undefined || this.base.is(value)
	}
	override prune(value: V | undefined | any): V | undefined {
		return value === undefined ? undefined : this.base.prune(value)
	}
	static create<V, B extends Base<V>>(creator: isly.Creator, base: B, name?: string): Class<V, B> {
		return new Class<V, B>(creator, base, name).modify()
	}
}
export namespace Class {
	export interface Creator {
		<V extends any | undefined = unknown | undefined, B extends Base<V> = Base<V>>(
			type: "optional",
			base: B,
			name?: string
		): Optional<V, B>
	}
}
