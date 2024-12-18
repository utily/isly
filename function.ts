import { Type } from "./Type"

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function islyFunction<T extends Function>(): Type<T> {
	return new IslyFunction()
}
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export class IslyFunction<T extends Function = Function> extends Type<T> {
	readonly class = "function"
	constructor() {
		super("function")
	}
	is = (value: T | any): value is T => !!(value && typeof value == "function")
}
