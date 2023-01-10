import { Flaw } from "./Flaw"
import { Type } from "./Type"

export function lazy<T>(factory: () => Type<T>): Type<T> {
	let type: Type<T>
	return Type.create(
		() => (type ??= factory()).name,
		(value: any | string): value is T => (type ??= factory()).is(value),
		(value: any): true | Flaw => (type ??= factory()).flaw(value)
	)
}
