import { Type } from "../Type"

export namespace Record {
	export function create<T extends Record<string | number, any>>(key: Type<keyof T>, value: Type<T[keyof T]>): Type<T>
	export function create<K extends string | number, V>(key: Type<K>, value: Type<V>): Type<Record<K, V>>
	export function create<T extends Record<string | number, any>>(key: Type<keyof T>, value: Type<T[keyof T]>): Type<T> {
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
