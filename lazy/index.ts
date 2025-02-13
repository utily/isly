import type { Type } from "../Type"

export function lazy<V = any, B extends Type<V> = Type<V>>(creator: () => B): B {
	let target: B | undefined
	return new Proxy({} as B, {
		get: (_, property, receiver) => Reflect.get((target ??= creator()), property, receiver),
		set: (_, property, receiver) => Reflect.set((target ??= creator()), property, receiver),
		has: (_, property) => Reflect.has((target ??= creator()), property),
	})
}
