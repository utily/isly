import { Type } from "../Type"

export type Unknown<T = unknown> = Type<T>
export namespace Unknown {
	export type Definition = Type.Definition
	export function create<T = unknown>(name?: string): Unknown<T> {
		return Type.create<T>({
			class: "unknown",
			name: name ?? "unknown",
			is: (value: T | any): value is T => value != undefined,
		})
	}
}
