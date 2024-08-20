import { Type } from "./Type"

export function islyUndefined<T = undefined>(name?: string): Type<T> {
	return new islyUndefined.Class<T>(name ?? "undefined")
}
export namespace islyUndefined {
	export class Class<T = undefined> extends Type<T> {
		is = (value: T | any): value is T => value === undefined
	}
}
