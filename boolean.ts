import { Type } from "./Type"

export function boolean<B extends boolean = boolean>(booleanValue?: B): Type<B> {
	return new boolean.Class(booleanValue)
}
export namespace boolean {
	export class Class<T extends boolean = boolean> extends Type<T> {
		readonly class = "boolean"
		constructor(protected readonly booleanValue?: T) {
			super(booleanValue == undefined ? "boolean" : booleanValue ? "true" : "false")
		}
		is = (value: T | any): value is T =>
			typeof value == "boolean" && (this.booleanValue == undefined || value == this.booleanValue)
	}
}
