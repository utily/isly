import type { Flaw } from "./Flaw"
import { Type } from "./Type"

export function any<T>(name?: string): Type<T> {
	const n = name ?? "any"
	const is = (value => value != undefined) as Type.IsFunction<T>

	return Type.create<T>(
		n,
		is,
		<A>(value: A) =>
			(is(value)
				? undefined
				: {
						type: n,
				  }) as A extends T ? undefined : Flaw
	)
}
