import { Base } from "../Base"
import type { isly } from "../index"

export class Class<V extends any | undefined = unknown | undefined, B extends Base<V> = Base<V>> extends Base<V> {
	readonly class = "readonly"
	private _name: string | undefined
	get name(): string {
		return (this._name ??= `Readonly<${this.base.name}>`)
	}
	override get definition(): isly.Definition {
		return Object.assign(super.definition, { base: this.base.definition })
	}
	private constructor(readonly base: B, name?: string) {
		super()
		this._name = name
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
	): isly.Readonly<V, B> {
		return new Class<V, B>(base, name)
	}
}
