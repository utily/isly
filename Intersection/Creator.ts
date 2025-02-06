import type { Base } from "../Base"
import type { Intersection } from "."

export type Creator = {
	<T extends A & B, A, B>(type: "intersection", typeA: Base<A>, typeB: Base<B>): Intersection<T>
	<T extends A & B & C, A, B, C>(type: "intersection", typeA: Base<A>, typeB: Base<B>, typeC: Base<C>): Intersection<T>
	<T extends A & B & C, A, B, C>(type: "intersection", typeA: Base<A>, typeB: Base<B>, typeC: Base<C>): Intersection<T>
	<T extends A & B & C & D, A, B, C, D>(
		type: "intersection",
		typeA: Base<A>,
		typeB: Base<B>,
		typeC: Base<C>,
		typeD: Base<D>
	): Intersection<T>
	<T extends A & B & C & D & E, A, B, C, D, E>(
		type: "intersection",
		typeA: Base<A>,
		typeB: Base<B>,
		typeC: Base<C>,
		typeD: Base<D>,
		typeE: Base<E>
	): Intersection<T>
	<T extends A & B & C & D & E & F, A, B, C, D, E, F>(
		type: "intersection",
		typeA: Base<A>,
		typeB: Base<B>,
		typeC: Base<C>,
		typeD: Base<D>,
		typeE: Base<E>,
		typeF: Base<F>
	): Intersection<T>
}
export namespace Creator {}
