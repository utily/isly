import { Flaw } from "Flaw"
import { Base } from "../Base"
import type { isly } from "../index"
import { Number } from "../Number"
import { String } from "../String"
import { Unknown } from "../Unknown"

export class Class<
	V extends Record<string | number | symbol, any>,
	KType extends keyof V extends string ? String : keyof V extends number ? Number : Unknown<symbol>,
	VType extends Base<V[keyof V]>
> extends Base<V> {
	readonly class = "record"
	override get definition(): isly.Definition {
		return Object.assign(super.definition, { key: this.key.definition, value: this.value.definition })
	}
	private constructor(
		creator: typeof isly,
		readonly key: KType,
		readonly value: VType,
		readonly name: string = `Record<${key.name}, ${value.name}>`
	) {
		super(creator, `Record of type ${value.name} indexed by ${key.name}.`)
	}
	override is(value: V | any): value is V {
		return !!(
			value &&
			typeof value == "object" &&
			!Array.isArray(value) &&
			Object.entries(value).every(
				this.key.class == "number"
					? ([k, v]) => this.key.is(`${+k}` == k ? +k : k) && this.value.is(v)
					: ([k, v]) => this.key.is(k) && this.value.is(v)
			)
		)
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
		KType extends keyof V extends string ? String : keyof V extends number ? Number : Unknown<symbol>,
		VType extends Base<V[keyof V]>
	>(creator: typeof isly, key: KType, value: VType, name?: string): Class<V, KType, VType> {
		return new Class<V, KType, VType>(creator, key, value, name)
	}
}
