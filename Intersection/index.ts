import { Type } from "../Type"

export namespace Intersection {
	export function create<T extends A & B, A, B>(typeA: Type<A>, typeB: Type<B>): Type<T>
	export function create<T extends A & B & C, A, B, C>(typeA: Type<A>, typeB: Type<B>, typeC: Type<C>): Type<T>
	export function create<T extends A & B & C, A, B, C>(typeA: Type<A>, typeB: Type<B>, typeC: Type<C>): Type<T>
	export function create<T extends A & B & C & D, A, B, C, D>(
		typeA: Type<A>,
		typeB: Type<B>,
		typeC: Type<C>,
		typeD: Type<D>
	): Type<T>
	export function create<T extends A & B & C & D & E, A, B, C, D, E>(
		typeA: Type<A>,
		typeB: Type<B>,
		typeC: Type<C>,
		typeD: Type<D>,
		typeE: Type<E>
	): Type<T>
	export function create<T extends A & B & C & D & E & F, A, B, C, D, E, F>(
		typeA: Type<A>,
		typeB: Type<B>,
		typeC: Type<C>,
		typeD: Type<D>,
		typeE: Type<E>,
		typeF: Type<F>
	): Type<T>
	export function create<T>(...types: Type<unknown>[]): Type<T> {
		return Type.create<T>({
			class: "intersection",
			name: types.map(type => type.name).join(" & "),
			is: (value: T | any): value is T => types.every(type => type.is(value)),
		})
	}
}
