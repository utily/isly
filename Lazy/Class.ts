import { Base } from "../Base"
import type { isly } from "../index"

export class Class<V extends any | undefined = unknown | undefined, B extends Base<V> = Base<V>> extends Base<V> {
	readonly class = "lazy"
	#load: () => B
	#base: B | undefined
	get base(): B {
		return (this.#base ??= this.#load())
	}
	private constructor(load: () => B, readonly name: string) {
		super()
		this.#load = load
	}
	override is(value: V | any): value is V {
		return value === undefined || this.base.is(value)
	}
	override prune(value: V | any): V | undefined {
		return this.base.prune(value)
	}
	static create<V extends any | undefined = unknown | undefined, B extends Base<V> = Base<V>>(
		load: () => B,
		name: string
	): isly.Lazy<V, B> {
		return new Class<V, B>(load, name)
	}
}
