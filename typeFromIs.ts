import { Type } from "./Type"

class IslyFromIs<T> extends Type.AbstractType<T> {
	constructor(name: string, protected readonly isFunction: (value: T) => boolean) {
		super(name)
	}
	is(value: any): value is T {
		return this.isFunction(value)
	}
}

/**
 * Function to quick create a isly.Type from an existing is-function
 *
 * @param config
 */
export function typeFromIs<T>(name: string, is: Type.IsFunction<T>): Type<T> {
	return new IslyFromIs(name, is)
}
