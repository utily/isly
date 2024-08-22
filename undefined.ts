import { Type } from "./Type"

export function islyUndefined<T = undefined>(name?: string): Type<T> {
	return new IslyUndefined<T>(name ?? "undefined")
}
export class IslyUndefined<T = undefined> extends Type<T> {
	readonly class = "undefined"
	is = (value: T | any): value is T => value === undefined
}
