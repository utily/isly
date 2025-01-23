import { Array } from "../Array"
import { Optional } from "../Optional"
import { Readonly } from "../Readonly"
import { Definition as TypeDefinition } from "./Definition"

export interface Type<V, T extends Type<V, T>> extends Type.Definition {
	readonly class: T["class"]
	is(value: V | any): value is V
	get(value: V | any, fallback?: V): V | undefined
	rename(name: string): T
	describe(description: string): T
	optional(name?: string): Optional<T>
	readonly(name?: string): Readonly<V, T>
	array(name?: string): Array<V, T>
}
export namespace Type {
	export import Definition = TypeDefinition
	export function construct<B, T extends Type<B, T>>(): Pick<Type<B, T>, "get" | "rename" | "describe"> {
		return {
			get(value: B | any, fallback?: B): B | undefined {
				return (this as T).is(value) ? value : fallback
			},
			rename(name: string): T {
				return { ...(this as T), name }
			},
			describe(description: string): T {
				return { ...(this as T), description }
			},
		}
	}
}
