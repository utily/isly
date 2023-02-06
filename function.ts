import type { Flaw } from "./Flaw"
import { Type } from "./Type"

// eslint-disable-next-line @typescript-eslint/ban-types
export function islyFunction<T extends Function>(): Type<T> {
	const name = "function"
	const is = (value => value && typeof value == "function") as Type.IsFunction<T>

	return Type.create<T>(
		name,
		is,
		<A>(value: A) =>
			(is(value)
				? undefined
				: {
						type: name,
				  }) as A extends T ? undefined : Flaw
	)
}
