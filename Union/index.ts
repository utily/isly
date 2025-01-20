import { Type } from "../Type"

export namespace Union {
	export function create<T extends A | B, A, B>(...types: [Type<A>, Type<B>]): Type<T>
	export function create<T extends A | B | C, A, B, C>(...types: [Type<A>, Type<B>, Type<C>]): Type<T>
	export function create<T extends A | B | C | D, A, B, C, D>(...types: [Type<A>, Type<B>, Type<C>, Type<D>]): Type<T>
	export function create<T extends A | B | C | D | E, A, B, C, D, E>(
		...types: [Type<A>, Type<B>, Type<C>, Type<D>, Type<E>]
	): Type<T>
	export function create<T extends A | B | C | D | E | F, A, B, C, D, E, F>(
		...types: [Type<A>, Type<B>, Type<C>, Type<D>, Type<E>, Type<F>]
	): Type<T>
	export function create<T>(...types: Type<T>[]): Type<T>
	export function create<T>(...types: Type<T>[]): Type<T> {
		return Type.create<T>({
			class: "union",
			name: types.map(type => type.name).join(" | "),
			is: (value: T | any): value is T => types.some(type => type.is(value)),
			get: (value: T | any) => types.find(t => t.is(value))?.get(value),
		})
	}
}
