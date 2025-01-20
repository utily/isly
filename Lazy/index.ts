import { Type } from "../Type"

export namespace Lazy {
	export function create<T, R extends Type<T> = Type<T>>(creator: () => R): R {
		let target: R | undefined
		return new Proxy(
			{},
			{
				get: (_, property, receiver) => Reflect.get((target ??= creator()), property, receiver),
				set: (_, property, receiver) => Reflect.set((target ??= creator()), property, receiver),
				has: (_, property) => Reflect.has((target ??= creator()), property),
			}
		) as R
	}
}
