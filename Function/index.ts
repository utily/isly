import { Type } from "../Type"

export namespace Function {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
	export function create<T extends Function>(): Type<T> {
		return Type.create({
			class: "function",
			name: "function",
			is: (value: T | any): value is T => !!(value && typeof value == "function"),
		})
	}
}
