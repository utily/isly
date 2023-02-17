import { Type } from "./Type"

class IslyAny<T> extends Type.AbstractType<T> {
	is(value: any): value is T {
		return value != undefined
	}
}

export function any<T>(name?: string): Type<T> {
	return new IslyAny<T>(name ?? "any")
}
