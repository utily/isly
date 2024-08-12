import { Type } from "./Type"

class IslyUnknown<T = unknown> extends Type<T> {
	is = (value: T | any): value is T => value != undefined
}
export function unknown<T = unknown>(name?: string): Type<T> {
	return new IslyUnknown<T>(name ?? "unknown")
}
