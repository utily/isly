import { Type } from "./Type"

export function record<R extends Record<string, string> = Record<never, never>>(
	keyType: Type<keyof R>,
	valueType: Type<R[string]>
): Type<R>
export function record<K extends string, V>(keyType: Type<K>, valueType: Type<V>): Type<Record<K, V>>
export function record<K extends string, V>(keyType: Type<K>, valueType: Type<V>): Type<Record<K, V>> {
	const name = () => `Record<${keyType.name}, ${valueType.name}>`
	const is = (value =>
		value &&
		typeof value == "object" &&
		!globalThis.Array.isArray(value) &&
		globalThis.Object.entries(value).every(
			([key, value]) => keyType.is(key) && valueType.is(value)
		)) as Type.IsFunction<Record<K, V>>

	const flaw = (value =>
		is(value)
			? undefined
			: {
					type: name(),
					flaws:
						value &&
						typeof value == "object" &&
						!globalThis.Array.isArray(value) &&
						globalThis.Object.entries(value).flatMap(([key, propertyValue]) =>
							[keyType.flaw(key), valueType.flaw(propertyValue)]
								.map((flaw, index) => flaw && { property: key + `(${["key", "value"][index]})`, ...flaw })
								.filter(Boolean)
						),
			  }) as Type.FlawFunction<Record<K, V>>

	return Type.create(name, is, flaw)
}
