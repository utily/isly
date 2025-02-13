import { Base } from "../Base"
import type { isly } from "../index"

export class Class<V, B extends Base<V>> extends Base<V | undefined> {
	readonly class = "optional"
	#name: string | undefined
	get name(): string {
		return (this.#name ??= `${this.base.name} | undefined`)
	}
	override get definition(): isly.Definition {
		return Object.assign(super.definition, { base: this.base.definition })
	}
	private constructor(readonly base: B, name?: string) {
		super()
		this.#name = name
	}
	override is(value: V | undefined | any): value is V | undefined {
		return value === undefined || this.base.is(value)
	}
	override prune(value: V | undefined | any): V | undefined {
		return value === undefined ? undefined : this.base.prune(value)
	}
	static create<V extends any | undefined = unknown | undefined, B extends Base<V> = Base<V>>(
		base: B,
		name?: string
	): isly.Optional<V, B> {
		return new Class<V, B>(base, name)
	}
}
