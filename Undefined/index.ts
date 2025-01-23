import { Type } from "../Type"

export type Undefined<T = undefined> = Type<T>
export namespace Undefined {
	export type Definition = Type.Definition
	export function create<T = undefined>(name?: string): Undefined<T> {
		return Type.create<T>({
			class: "undefined",
			name: name ?? "undefined",
			is: (value: T | any): value is T => value === undefined,
		})
	}
}
