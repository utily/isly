import { Type } from "./Type"

// eslint-disable-next-line @typescript-eslint/ban-types
class IslyFunction<T extends Function> extends Type<T> {
	constructor() {
		super("function")
	}
	is = (value: T | any): value is T => !!(value && typeof value == "function")
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function islyFunction<T extends Function>(): Type<T> {
	return new IslyFunction()
}
