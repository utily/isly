import { Type } from "./Type"

export function any<T = any>(name?: string): Type<T> {
	return new any.Class<T>(name ?? "any")
}
export namespace any {
	export class Class<T = any> extends Type<T> {
		readonly class = "any"
		is = (value: T | any): value is T => value != undefined
	}
}
