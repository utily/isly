import { Base } from "../Base"
import type { isly } from "../index"

export class Class<V extends any | undefined = unknown | undefined, B extends Base<V> = Base<V>> extends Base<V> {
	readonly class = "lazy"
	private _load: () => B
	private _base: B | undefined
	get base(): B {
		return (this._base ??= this._load())
	}
	override get definition(): isly.Definition {
		return this.manualDefinition ?? super.definition
	}
	private constructor(load: () => B, readonly name: string, private readonly manualDefinition?: isly.Definition) {
		super()
		this._load = load
	}
	override is(value: V | any): value is V {
		return value === undefined || this.base.is(value)
	}
	override prune(value: V | any): V | undefined {
		return this.base.prune(value)
	}
	static create<V extends any | undefined = unknown | undefined, B extends Base<V> = Base<V>>(
		load: () => B,
		name: string,
		definition?: isly.Definition
	): isly.Lazy<V, B> {
		return new Class<V, B>(load, name, definition)
	}
}
