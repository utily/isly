import { Type } from "./Type"

class ArrayClass<T> extends Type<T[]> {
	readonly name: string
	constructor(readonly item: Type<T>) {
		super()
		this.name = this.item.name + "[]"
	}
	is(value: any | T[]): value is T[] {
		return globalThis.Array.isArray(value) && value.every(item => this.item.is(item))
	}
}
export type Array<T> = ArrayClass<T>
export function array<T>(item: Type<T>): Array<T> {
	return new ArrayClass(item)
}
