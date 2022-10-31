import { Type } from "./Type"

class UnionClass<T> extends Type<T> {
	readonly name: string
	constructor(readonly types: Type<T>[]) {
		super()
		this.name = this.types.map(type => type.name).join(" | ")
	}
	is(value: any | T): value is T {
		return this.types.some(type => type.is(value))
	}
}
export type Union<T> = UnionClass<T>
export function union<T>(...types: Type<T>[]): UnionClass<T> {
	return new UnionClass(types)
}
