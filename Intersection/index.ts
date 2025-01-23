import { Type } from "../Type"
import { Definition as IntersectionDefinition } from "./Definition"

export interface Intersection<T = unknown> extends Type<T> {
	types: Type<unknown>[]
}

export namespace Intersection {
	export import Definition = IntersectionDefinition
	export function create<T extends A & B, A, B>(typeA: Type<A>, typeB: Type<B>): Intersection<T>
	export function create<T extends A & B & C, A, B, C>(typeA: Type<A>, typeB: Type<B>, typeC: Type<C>): Intersection<T>
	export function create<T extends A & B & C, A, B, C>(typeA: Type<A>, typeB: Type<B>, typeC: Type<C>): Intersection<T>
	export function create<T extends A & B & C & D, A, B, C, D>(
		typeA: Type<A>,
		typeB: Type<B>,
		typeC: Type<C>,
		typeD: Type<D>
	): Intersection<T>
	export function create<T extends A & B & C & D & E, A, B, C, D, E>(
		typeA: Type<A>,
		typeB: Type<B>,
		typeC: Type<C>,
		typeD: Type<D>,
		typeE: Type<E>
	): Intersection<T>
	export function create<T extends A & B & C & D & E & F, A, B, C, D, E, F>(
		typeA: Type<A>,
		typeB: Type<B>,
		typeC: Type<C>,
		typeD: Type<D>,
		typeE: Type<E>,
		typeF: Type<F>
	): Intersection<T>
	export function create<T>(...types: Type<unknown>[]): Intersection<T> {
		return Object.assign(
			Type.create<T>({
				class: "intersection",
				name: types.map(type => type.name).join(" & "),
				is: (value: T | any): value is T => types.every(type => type.is(value)),
			}),
			{ types }
		)
	}
}
