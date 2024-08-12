import { Type } from "./Type"

class IslyUndefined<T = undefined> extends Type<T> {
	is = (value: T | any): value is T => value === undefined
}

export function islyUndefined<T = undefined>(name?: string): Type<T> {
	return new IslyUndefined<T>(name ?? "undefined")
}
