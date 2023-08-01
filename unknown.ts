import { Type } from "./Type"

class IslyUnknown<T = unknown> extends Type<T> {
	is = (value => value != undefined) as Type.IsFunction<T>
}
export function unknown<T = unknown>(name?: string): Type<T> {
	return new IslyUnknown<T>(name ?? "unknown")
}
