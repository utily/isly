import { Type } from "../Type"

export type Any<T = any> = Type<T>
export namespace Any {
	export type Definition = Type.Definition
	export function create<T = any>(name?: string): Any<T> {
		return Type.create({ class: "any", name: name ?? "any", is: (value: T | any): value is T => value != undefined })
	}
}
