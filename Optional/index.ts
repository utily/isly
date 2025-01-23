import { Type } from "../Type"

export interface Optional<V = unknown, R extends V | undefined = V | undefined, T extends Type<V, Type<V, T>>>
	extends Type<R, Type<V, R>> {
	readonly base: T
}
export namespace Optional {
	export interface Definition extends Type.Definition {
		readonly class: "optional"
		readonly base: Type.Definition
	}
	export function create<B = unknown, T extends B | undefined = B | undefined>(
		base: Type<B>,
		name?: string
	): Optional<B, T> {
		return Object.assign(
			Type.create<T>({
				class: "optional",
				name: name ?? `${base.name} | undefined`,
				is: (value: T | any): value is T => value == undefined || base.is(value),
			}),
			{ base }
		)
	}
}
Type.register({ optional: (name?: string) => Optional.create(this as Type, name) })
