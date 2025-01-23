import type { Array } from "../../Array"
import { Optional } from "../../Optional"
import { Readonly } from "../../Readonly"
import type { Type } from ".."
import { Method as MethodsMethod } from "./Method"

export interface Methods<B = any, T extends Type<B> = Type<B>> {
	readonly optional: (name?: string) => Optional<T>
	readonly readonly: (name?: string) => Readonly<B>
	readonly array: (name?: string) => Array<B>
}
export namespace Methods {
	export import Method = MethodsMethod
	export const prototype: Partial<Methods> = {}
	export function register(method: Partial<Methods>): void {
		Object.assign(prototype, method)
	}
}
