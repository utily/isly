import type { Flaw } from "./Flaw"
import { Type } from "./Type"

class IslyUnion<T> extends Type<T> {
	protected readonly types: Type<T>[]
	constructor(...types: Type<T>[]) {
		super(() => types.map(type => type.name).join(" | "))
		this.types = types
	}
	is = (value => this.types.some(type => type.is(value))) as Type.IsFunction<T>

	protected createFlaw(value: any): Omit<Flaw, "isFlaw" | "type" | "condition"> {
		return {
			flaws: this.types.map(type => type.flaw(value)).filter(flaw => flaw) as Flaw[],
		}
	}
}

/**
 * For unions with more than 6 types, provide the union type as the generic T.
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
	return new IslyUnion(...types)
}
