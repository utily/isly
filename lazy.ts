import { Type } from "./Type"

export function lazy<T>(factory: () => Type<T>): Type<T> {
	let type: Type<T>
	return Type.create(
		() => (type ??= factory()).name,
		(value => (type ??= factory()).is(value)) as Type.IsFunction<T>,
		(value => (type ??= factory()).flaw(value)) as Type.FlawFunction
	)
}
