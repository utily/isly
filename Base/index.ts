// import type { Array } from "../Array"
import type { Optional } from "../Optional"
import type { Readonly } from "../Readonly"
import type { Type } from "../Type"
import { Definition as BaseDefinition } from "./Definition"

export interface Base<V, T extends Base<V, T>> {
	readonly name: string
	readonly description?: string
	readonly condition?: string
	bind(): T
	is(value: V | any): value is V
	get(value: V | any, fallback?: V): V | undefined
	restrict(verify: (value: V) => boolean, condition: string, name?: string): T
	rename(name: string): T
	describe(description: string): T
	optional(name?: string): Optional<T>
	readonly(name?: string): Readonly<T>
	// array(name?: string): Array<V, T>
}
export namespace Base {
	export import Definition = BaseDefinition
	export function generate<V, T extends Base<V, T>>(): Pick<
		T,
		"bind" | "get" | "restrict" | "rename" | "describe" | Methods.Name
	> {
		return {
			bind(): T {
				;(this as T).is = (this as T).is.bind(this)
				return this as T
			},
			get(value: V | any, fallback?: V): V | undefined {
				return (this as T).is(value) ? value : fallback
			},
			restrict(verify: (value: V) => boolean, condition: string, name?: string): T {
				const previous = (this as T).is
				return {
					...(this as T),
					is(value: V | any): value is V {
						return previous(value) && verify(value)
					},
					condition,
					name,
				}.bind()
			},
			rename(name: T["name"]): T {
				return { ...(this as T), name }.bind()
			},
			describe(description: string): T {
				return { ...(this as T), description }.bind()
			},
			...(prototype as unknown as Pick<Base<V, T>, Methods.Name>),
		}
	}
	export type Methods = Pick<Type, Methods.Name>
	export namespace Methods {
		export type Name = "optional" | "readonly"
	}
	export const prototype: Methods = {
		optional(name?: string): Optional<any, Type> {
			throw new Error("Not implemented")
		},
		readonly(name?: string): Readonly<any, Type> {
			throw new Error("Not implemented")
		},
	}
	export function register(method: Partial<Methods>): void {
		Object.assign(prototype, method)
	}
}
