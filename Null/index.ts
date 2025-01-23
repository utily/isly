import { Type } from "../Type"

export type Null<T = null> = Type<T>
export namespace Null {
	export type Definition = Type.Definition
	export function create<T = null>(name?: string): Null<T> {
		return Type.create({ class: "null", name: name ?? "null", is: (value: T | any): value is T => value === null })
	}
}
