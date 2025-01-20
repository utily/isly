import { Type } from "../Type"

export namespace Any {
	export function create<T = any>(name?: string): Type<T> {
		return Type.create({ class: "any", name: name ?? "any", is: (value: T | any): value is T => value != undefined })
	}
}
