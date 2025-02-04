import { Base } from "../Base"
import { Number } from "../Number"
import { String } from "../String"

export class Class<
	K extends string | number,
	KType extends String | Number,
	V extends any | undefined,
	VType extends Base<V>
> extends Base<Record<K, V>> {
	readonly class = "record"
	private constructor(
		readonly key: KType,
		readonly value: VType,
		readonly name: string = `Record<${key.name}, ${value.name}>`
	) {
		super(`Record of type ${value.name} indexed by ${key.name}.`)
	}
	override is(value: Record<K, V> | any): value is Record<K, V> {
		return !!(
			value &&
			typeof value == "object" &&
			!Array.isArray(value) &&
			Object.entries(value).every(
				this.key.class == "number"
					? ([k, v]) => this.key.is(`${+k}` == k ? +k : k) && value.is(v)
					: ([k, v]) => this.key.is(k) && value.is(v)
			)
		)
	}
	static create<
		K extends string | number,
		KType extends String | Number,
		V extends any | undefined,
		VType extends Base<V>
	>(key: KType, value: VType, name?: string): Class<K, KType, V, VType> {
		return new Class<K, KType, V, VType>(key, value, name)
	}
}
