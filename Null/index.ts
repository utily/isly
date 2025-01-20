import { Type } from "../Type"

export namespace Null {
	export function create<T = null>(name?: string): Type<T> {
		return Type.create({ class: "null", name: name ?? "null", is: (value: T | any): value is T => value === null })
	}
}
