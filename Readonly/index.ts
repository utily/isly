import { Type } from "../Type"

export interface Readonly<B = any, T extends globalThis.Readonly<B> = globalThis.Readonly<B>> extends Type<T> {
	readonly base: Type<B>
}
export namespace Readonly {
	export interface Definition extends Type.Definition {
		readonly class: "readonly"
		readonly base: Type.Definition
	}
	export function create<B = any, T extends globalThis.Readonly<B> = globalThis.Readonly<B>>(
		base: Type<B>
	): Readonly<B, T> {
		return Object.assign(
			Type.create<T>({
				class: "readonly",
				name: `Readonly<${base.name}>`,
				is: (value: T | any): value is T => base.is(value),
			}),
			{ base }
		)
	}
}
Type.Methods.register("readonly", type => Object.assign(type, () => Readonly.create(type)))
