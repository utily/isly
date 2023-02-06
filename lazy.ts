import { Type } from "./Type"

/**
 * Late evaluation of a type
 * Can be used for for recursive types.
 *
 * @param factory
 * @param name Provide a name, to avoid infinite loop if the type i recursive
 * @returns
 */
export function lazy<T>(factory: () => Type<T>, name?: string): Type<T> {
	let type: Type<T>
	return Type.create(
		name ?? (() => (type ??= factory()).name),
		(value => (type ??= factory()).is(value)) as Type.IsFunction<T>,
		(value => (type ??= factory()).flaw(value)) as Type.FlawFunction<T>
	)
}
