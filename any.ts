import { Type } from "./Type"

class IslyAny<T = any> extends Type<T> {
	is = (value: T | any): value is T => value != undefined
}

export function any<T = any>(name?: string): Type<T> {
	return new IslyAny<T>(name ?? "any")
}
