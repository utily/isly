import type { Base } from "../Base"
import type { Union } from "."

export type Creator = {
	<V>(type: "union", ...types: Base<V>[]): Union<V>
	<T extends A | B, A, B>(type: "union", ...types: [Base<A>, Base<B>]): Union<T>
	<T extends A | B | C, A, B, C>(type: "union", ...types: [Base<A>, Base<B>, Base<C>]): Union<T>
	<T extends A | B | C | D, A, B, C, D>(type: "union", ...types: [Base<A>, Base<B>, Base<C>, Base<D>]): Union<T>
	<T extends A | B | C | D | E, A, B, C, D, E>(
		type: "union",
		...types: [Base<A>, Base<B>, Base<C>, Base<D>, Base<E>]
	): Union<T>
	<T extends A | B | C | D | E | F, A, B, C, D, E, F>(
		type: "union",
		...types: [Base<A>, Base<B>, Base<C>, Base<D>, Base<E>, Base<F>]
	): Union<T>
}
export namespace Creator {}
