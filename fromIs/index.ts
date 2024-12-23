import { Type } from "../Type"

/**
 * Function to quick create a isly.Type from an existing is-function
 *
 * @param config
 */
export function fromIs<T>(name: string, is: (value: T | any) => value is T): Type<T>
export function fromIs<T>(name: string, is: (value: any) => boolean): Type<T>
export function fromIs<T>(name: string, is: ((value: T | any) => value is T) | ((value: any) => boolean)): Type<T> {
	return new IslyFromIs(name, is)
}
export class IslyFromIs<T = unknown> extends Type<T> {
	readonly class = "fromIs"
	constructor(name: string, protected readonly isFunction: (value: any) => boolean) {
		super(name)
	}
	is = (value: T | any): value is T => this.isFunction(value)
}
