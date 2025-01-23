import { Type } from "../Type"

export interface Union<T = any> extends Type<T> {
	types: Type<any>[]
}
export namespace Union {
	export interface Definition extends Type.Definition {
		types: Type.Definition[]
	}
	export function create<T extends A | B, A, B>(...types: [Type<A>, Type<B>]): Union<T>
	export function create<T extends A | B | C, A, B, C>(...types: [Type<A>, Type<B>, Type<C>]): Union<T>
	export function create<T extends A | B | C | D, A, B, C, D>(...types: [Type<A>, Type<B>, Type<C>, Type<D>]): Union<T>
	export function create<T extends A | B | C | D | E, A, B, C, D, E>(
		...types: [Type<A>, Type<B>, Type<C>, Type<D>, Type<E>]
	): Union<T>
	export function create<T extends A | B | C | D | E | F, A, B, C, D, E, F>(
		...types: [Type<A>, Type<B>, Type<C>, Type<D>, Type<E>, Type<F>]
	): Union<T>
	export function create<T>(...types: Type<T>[]): Union<T>
	export function create<T>(...types: Type<T>[]): Union<T> {
		return Object.assign(
			Type.create<T>({
				class: "union",
				name: types.map(type => type.name).join(" | "),
				is: (value: T | any): value is T => types.some(type => type.is(value)),
				get: (value: T | any) => types.find(t => t.is(value))?.get(value),
			}),
			{ types }
		)
	}
}
