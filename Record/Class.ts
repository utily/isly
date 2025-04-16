import { Base } from "../Base"
import { Flaw } from "../Flaw"
import type { isly } from "../index"

export class Class<
	V extends Record<string | number | symbol, any>,
	KType extends Base<keyof V>,
	VType extends Base<V[keyof V]>
> extends Base<V> {
	readonly class = "record"
	private _name: string | undefined
	override get name(): string {
		return (this._name ??= `Record<${this.key.name}, ${this.value.name}>`)
	}
	override get definition(): isly.Definition {
		return Object.assign(super.definition, { key: this.key.definition, value: this.value.definition })
	}
	private constructor(readonly key: KType, readonly value: VType, name?: string) {
		super()
		this._name = name
	}
	override is(value: V | any): value is V {
		let result: boolean
		if (!value || typeof value != "object" || Array.isArray(value))
			result = false
		else if (
			this.key.class == "string" &&
			"allowed" in this.key &&
			Array.isArray(this.key.allowed) &&
			this.key.allowed.every(v => typeof v == "string")
		)
			result =
				Object.keys(value).length == this.key.allowed.length && this.key.allowed.every(key => this.value.is(value[key]))
		else
			result = Object.entries(value).every(
				([k, v]) => (this.key.is(k) || this.key.is(`${+k}` == k ? +k : k)) && this.value.is(v)
			)
		return result
	}
	override prune(value: V | any): V | undefined {
		return (
			this.is(value) &&
			Object.fromEntries(Object.entries(value).map(([key, value]) => [this.key.prune(key), this.value.prune(value)]))
		)
	}
	override flawed(value: V | any): Flaw | false {
		const result = super.flawed(value)
		return (
			result && {
				...result,
				flaws: Object.entries(value)
					.map(([key, value]) => [key, this.key.flawed(key) || this.value.flawed(value)] as const)
					.map(([key, flaw]) => flaw && Object.assign(flaw, { property: key }))
					.filter((flaw): flaw is Flaw & { property: string } => !!flaw),
			}
		)
	}
	static create<
		V extends Record<string | number | symbol, any>,
		KType extends Base<keyof V> = Base<keyof V>,
		VType extends Base<V[keyof V]> = Base<V[keyof V]>
	>(key: KType, value: VType, name?: string): isly.Record<V, KType, VType> {
		return new Class<V, KType, VType>(key, value, name)
	}
}
