import { Flaw } from "./Flaw"
import { Type } from "./Type"

class IslyRecord<K extends string, V> extends Type.AbstractType<Record<K, V>> {
	constructor(protected readonly keyType: Type<K>, protected readonly valueType: Type<V>) {
		super(() => `Record<${keyType.name}, ${valueType.name}>`)
	}
	is(value: any): value is Record<K, V> {
		return (
			value &&
			typeof value == "object" &&
			!globalThis.Array.isArray(value) &&
			globalThis.Object.entries(value).every(([key, value]) => this.keyType.is(key) && this.valueType.is(value))
		)
	}
	protected createFlaw(value: any): Omit<Flaw, "isFlaw" | "type" | "condition"> {
		return {
			flaws:
				value &&
				typeof value == "object" &&
				!globalThis.Array.isArray(value) &&
				globalThis.Object.entries(value).flatMap(([key, propertyValue]) =>
					[this.keyType.flaw(key), this.valueType.flaw(propertyValue)]
						.map((flaw, index) => flaw && { property: key + `(${["key", "value"][index]})`, ...flaw })
						.filter(Boolean)
				),
		}
	}
}

export function record<R extends Record<string, string> = Record<never, never>>(
	keyType: Type<keyof R>,
	valueType: Type<R[string]>
): Type<R>
export function record<K extends string, V>(keyType: Type<K>, valueType: Type<V>): Type<Record<K, V>>
export function record<K extends string, V>(keyType: Type<K>, valueType: Type<V>): Type<Record<K, V>> {
	return new IslyRecord<K, V>(keyType, valueType)
}
