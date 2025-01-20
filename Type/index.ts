import type { Class } from "../Class"
import { Data as TypeData } from "./Data"
import { Methods as TypeMethods } from "./Methods"

export interface Type<T> extends Type.Data, Readonly<Type.Methods<T>> {
	readonly class: Class
	readonly is: (value: T | any) => value is T
	readonly get: (value: T | any, fallback?: T) => T | undefined
	readonly rename: (name: string) => Type<T>
	readonly describe: (description: string) => Type<T>
}
export namespace Type {
	export import Data = TypeData
	export import Methods = TypeMethods
	export function create<T, D extends Data = Data>(
		type: D & Partial<Type<T>> & Pick<Type<T>, "class" | "is">
	): Type<T> & D {
		const result = Object.assign(Methods.decorate(type), {
			get: type.get ?? ((value: T | any, fallback?: T): T | undefined => (result.is(value) ? value : fallback)),
			rename(name: string): Type<T> {
				return { ...result, name }
			},
			describe(description: string): Type<T> {
				return { ...result, description }
			},
		})
		return result
	}
}
