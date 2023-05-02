import { Type } from "./Type"

class IslyAny<T = any> extends Type<T> {
	is = (value => value != undefined) as Type.IsFunction<T>
}

export function any<T = any>(name?: string): Type<T> {
	return new IslyAny<T>(name ?? "any")
}
