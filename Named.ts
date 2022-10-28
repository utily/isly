import { Flaw } from "./Flaw"
import { Type } from "./Type"

export class NamedClass<T> extends Type<T> {
	constructor(readonly name: string, readonly backend: Type<T>) {
		super()
	}
	is(value: any | T): value is T {
		return this.backend.is(value)
	}
	flaw(value: any | T): true | Flaw {
		const result = this.backend.flaw(value)
		return (
			result == true || {
				...result,
				type: this.name,
			}
		)
	}
}
export type Named<T> = NamedClass<T>
export function named<T>(type: string, backend: Type<T>) {
	return new NamedClass(type, backend)
}
