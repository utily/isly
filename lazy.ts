import type { Base } from "Base"

export function lazy<V = any, B extends Base<V> = Base<V>>(creator: () => B): B {
	let target: B | undefined
	return new Proxy({} as B, {
		get: (_, property, receiver) => Reflect.get((target ??= creator()), property, receiver),
		set: (_, property, receiver) => Reflect.set((target ??= creator()), property, receiver),
		has: (_, property) => Reflect.has((target ??= creator()), property),
	})
}
export namespace lazy {
	export interface Creator {
		<V = any, B extends Base<V> = Base<V>>(load: () => B): B
	}
}
