import { Type } from "../Type"

export function unknown<T = unknown>(name?: string): Type<T> {
	return new IslyUnknown<T>(name ?? "unknown")
}

export class IslyUnknown<T = unknown> extends Type<T> {
	readonly class = "unknown"
	is = (value: T | any): value is T => value != undefined
}
