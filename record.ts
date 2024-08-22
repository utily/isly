import { Flaw } from "./Flaw"
import { Type } from "./Type"

export function record<R extends Record<string | number, any>>(
	keyType: Type<keyof R>,
	valueType: Type<R[keyof R]>
): Type<R>
export function record<K extends string | number, V>(keyType: Type<K>, valueType: Type<V>): Type<Record<K, V>>
export function record<K extends string | number, V>(keyType: Type<K>, valueType: Type<V>): Type<Record<K, V>> {
	return new IslyRecord<K, V>(keyType, valueType)
}
export class IslyRecord<K extends string | number = string | number, V = unknown> extends Type<Record<K, V>> {
	readonly class = "record"
	constructor(readonly keyType: Type<K>, readonly valueType: Type<V>) {
		super(() => `Record<${keyType.name}, ${valueType.name}>`)
	}
	is = (value: Record<K, V> | any): value is Record<K, V> =>
		!!(
			value &&
			typeof value == "object" &&
			!globalThis.Array.isArray(value) &&
			globalThis.Object.entries(value).every(
				([key, value]) =>
					this.keyType.is(this.keyType.name == "number" && `${+key}` == key ? +key : key) && this.valueType.is(value)
			)
		)
	protected createFlaw(value: any): Omit<Flaw, "isFlaw" | "type" | "condition"> {
		return {
			flaws:
				value &&
				typeof value == "object" &&
				!globalThis.Array.isArray(value) &&
				globalThis.Object.entries(value).flatMap(([key, propertyValue]) =>
					[
						this.keyType.flaw(this.keyType.name == "number" && `${+key}` == key ? +key : key),
						this.valueType.flaw(propertyValue),
					]
						.map((flaw, index) => (flaw.isFlaw ?? true) && { property: key + ` (${["key", "value"][index]})`, ...flaw })
						.filter(Boolean)
				),
		}
	}
	protected getValue(value: Record<K, V>): Record<K, V> {
		return globalThis.Object.fromEntries(
			globalThis.Object.entries(value).map(([key, value]) => [key, this.valueType.get(value)])
		) as Record<K, V>
	}
}
