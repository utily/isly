import { Type } from "../Type"

export function islyNull<T = null>(name?: string): Type<T> {
	return new IslyNull<T>(name ?? "null")
}
export class IslyNull<T = undefined> extends Type<T> {
	readonly class = "null"
	is = (value: T | any): value is T => value === null
}
