import { Flaw } from "./Flaw"
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
	flaw(value: any): true | Flaw {
		return (
			this.is(value) || {
				type: this.name,
				flaws: this.types.map(type => type.flaw(value)).filter(flaw => flaw != true) as Flaw[],
			}
		)
	}
}
export type Union<T> = UnionClass<T>
export function union<T>(...types: Type<T>[]): UnionClass<T> {
	return new UnionClass(types)
}
