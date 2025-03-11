import { Base } from "../Base"
import type { isly } from "../index"

export class Class<V, B extends Base<V>> extends Base<Exclude<any, V>> {
	readonly class = "inverse"
	#name: string | undefined
	get name(): string {
		return (this.#name ??= `Inverse<${this.base.name}>`)
	}
	override get definition(): isly.Definition {
		return Object.assign(super.definition, { base: this.base.definition })
	}
	private constructor(readonly base: B, name?: string) {
		super()
		this.#name = name
	}
	override is(value: V | undefined | any): value is Exclude<any, V> | undefined {
		return !this.base.is(value)
	}
	// TODO: What about prune?
	static create<V extends any | undefined = unknown | undefined, B extends Base<V> = Base<V>>(
		base: B,
		name?: string
	): isly.Inverse<V, B> {
		return new Class<V, B>(base, name)
	}
}
