import { Type } from "../Type"

export function any<T = any>(name?: string): Type<T> {
	return new IslyAny<T>(name ?? "any")
}
export class IslyAny<T = any> extends Type<T> {
	readonly class = "any"
	is = (value: T | any): value is T => value != undefined
}
