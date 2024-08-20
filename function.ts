import { Type } from "./Type"

// eslint-disable-next-line @typescript-eslint/ban-types
export function islyFunction<T extends Function>(): Type<T> {
	return new islyFunction.Class()
}
export namespace islyFunction {
	// eslint-disable-next-line @typescript-eslint/ban-types
	export class Class<T extends Function> extends Type<T> {
		constructor() {
			super("function")
		}
		is = (value: T | any): value is T => !!(value && typeof value == "function")
	}
}
