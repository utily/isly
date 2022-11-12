import { Flaw } from "./Flaw"
import { Type } from "./Type"

class OptionalClass<T> extends Type<T> {
	readonly name: string
	constructor(readonly backend: Type<T>) {
		super()
		this.name = this.backend.name + " | undefined"
	}
	is(value: any | T): value is T {
		return value == undefined || this.backend.is(value)
	}
	flaw(value: any | T): Flaw {
		const result = value == undefined || this.backend.flaw(value)
		return {
			...(result ? {} : result),
			type: this.name,
		}
	}
}
export type Optional<T> = OptionalClass<T>
export function optional<T>(backend: Type<T>) {
	return new OptionalClass(backend)
}
