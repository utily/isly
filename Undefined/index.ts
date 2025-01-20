import { Type } from "../Type"

export namespace Undefined {
	export function create<T = undefined>(name?: string): Type<T> {
		return Type.create<T>({
			class: "undefined",
			name: name ?? "undefined",
			is: (value: T | any): value is T => value === undefined,
		})
	}
}
