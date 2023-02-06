import type { Flaw } from "./Flaw"
import { Type } from "./Type"

/**
 * For unions with more than 4 types, provide the union type as the generic T.
 */
export function union<T extends A | B, A, B>(...types: [Type<A>, Type<B>]): Type<T>
export function union<T extends A | B | C, A, B, C>(...types: [Type<A>, Type<B>, Type<C>]): Type<T>
export function union<T extends A | B | C | D, A, B, C, D>(...types: [Type<A>, Type<B>, Type<C>, Type<D>]): Type<T>
export function union<T extends A | B | C | D | E, A, B, C, D, E>(
	...types: [Type<A>, Type<B>, Type<C>, Type<D>, Type<E>]
): Type<T>
export function union<T extends A | B | C | D | E | F, A, B, C, D, E, F>(
	...types: [Type<A>, Type<B>, Type<C>, Type<D>, Type<E>, Type<F>]
): Type<T>
export function union<T>(...types: Type<T>[]): Type<T> {
	const name = () => types.map(type => type.name).join(" | ")
	const is = (value => types.some(type => type.is(value))) as Type.IsFunction<T>
	return Type.create(
		name,
		is,
		<A>(value: A) =>
			(is(value)
				? undefined
				: {
						type: name(),
						flaws: types.map(type => type.flaw(value)).filter(flaw => flaw) as Flaw[],
				  }) as A extends T ? undefined : Flaw
	)
}
