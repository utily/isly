import { Type } from "./Type"

class IslyFromIs<T> extends Type<T> {
	constructor(name: string, protected readonly isFunction: (value: any) => boolean) {
		super(name)
	}
	is = (value => this.isFunction(value)) as Type.IsFunction<T>
}

/**
 * Function to quick create a isly.Type from an existing is-function
 *
 * @param config
 */
export function fromIs<T>(name: string, is: Type.IsFunction<T>): Type<T>
export function fromIs<T>(name: string, is: (value: any) => boolean): Type<T>
export function fromIs<T>(name: string, is: (value: any) => boolean): Type<T> {
	return new IslyFromIs(name, is)
}
