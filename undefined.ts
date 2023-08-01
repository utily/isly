import { Type } from "./Type"

class IslyUndefined<T = undefined> extends Type<T> {
	is = (value => value == undefined) as Type.IsFunction<T>
}

export function islyUndefined<T = undefined>(name?: string): Type<T> {
	return new IslyUndefined<T>(name ?? "undefined")
}
