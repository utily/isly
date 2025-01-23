import { Type } from "../Type"

export type Record<
	K extends string | number | symbol = string | number | symbol,
	V = any,
	T extends globalThis.Record<K, V> = globalThis.Record<K, V>
> = Type<T>
export namespace Record {
	export function create<T extends Record<string | number | symbol, any>>(
		key: Type<keyof T>,
		value: Type<T[keyof T]>
	): Record<keyof T, T[keyof T], T>
	export function create<
		K extends string | number | symbol = string | number | symbol,
		V = any,
		T extends globalThis.Record<K, V> = globalThis.Record<K, V>
	>(key: Type<K>, value: Type<V>): Record<K, V, T>
	export function create<T extends Record<string | number | symbol, any>>(
		key: Type<keyof T>,
		value: Type<T[keyof T]>
	): Record<keyof T, T[keyof T], T> {
		return Type.create<T>({
			class: "record",
			name: `Record<${key.name}, ${value.name}>`,
			is: (value: T | any): value is T =>
				!!(
					value &&
					typeof value == "object" &&
					!Array.isArray(value) &&
					Object.entries(value).every(
						key.class == "number"
							? ([k, v]) => key.is(`${+k}` == k ? +k : k) && value.is(v)
							: ([k, v]) => key.is(k) && value.is(v)
					)
				),
		})
	}
}
