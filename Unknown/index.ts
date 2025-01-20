import { Type } from "../Type"

export namespace Unknown {
	export function create<T = unknown>(name?: string): Type<T> {
		return Type.create<T>({
			class: "unknown",
			name: name ?? "unknown",
			is: (value: T | any): value is T => value != undefined,
		})
	}
}
