import { Type } from "../Type"

export type Function<T extends globalThis.Function = globalThis.Function> = Type<T>
export namespace Function {
	export type Definition = Type.Definition
	export function create<T extends globalThis.Function = globalThis.Function>(): Function<T> {
		return Type.create({
			class: "function",
			name: "function",
			is: (value: T | any): value is T => !!(value && typeof value == "function"),
		})
	}
}
