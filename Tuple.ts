import { Type } from "./Type"

class TupleClass<T> extends Type<T[]> {
	readonly name: string
	constructor(readonly item: Type<T>[]) {
		super()
		this.name = "[" + this.item.map(e => e.name).join(", ") + "]"
	}
	is(value: any | T[]): value is T[] {
		return (
			globalThis.Array.isArray(value) &&
			value.length == this.item.length &&
			this.item.every((item, index) => item.is(value[index]))
		)
	}
}
export type Tuple<T> = TupleClass<T>
export function tuple<T>(...items: Type<T>[]): TupleClass<T> {
	return new TupleClass(items)
}
