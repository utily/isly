import { Type } from "./Type"

export function any<T>(name?: string): Type<T> {
	const n = name ?? "any"
	const is = (value => value != undefined) as Type.IsFunction<T>

	return Type.create<T>(n, is, value =>
		is(value)
			? undefined
			: {
					type: n,
			  }
	)
}
