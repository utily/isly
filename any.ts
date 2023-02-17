import { Type } from "./Type"

class IslyAny<T> extends Type.AbstractType<T> {
	is = (value => value != undefined) as Type.IsFunction<T>
}

export function any<T>(name?: string): Type<T> {
	return new IslyAny<T>(name ?? "any")
}
