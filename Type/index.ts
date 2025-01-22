import type { Class } from "../Class"
import { Definition as TypeDefinition } from "./Definition"
import { Methods as TypeMethods } from "./Methods"

export interface Type<T> extends Type.Definition, Readonly<Type.Methods<T>> {
	readonly class: Class
	// readonly definition: Type.Definition
	readonly is: (value: T | any) => value is T
	readonly get: (value: T | any, fallback?: T) => T | undefined
	readonly rename: (name: string) => Type<T>
	readonly describe: (description: string) => Type<T>
	// readonly flaw: (value: T | any) => false | Type.Definition
}
export namespace Type {
	export import Definition = TypeDefinition
	export import Methods = TypeMethods
	export function create<T, D extends Definition = Definition>(
		type: D & Partial<Type<T>> & Pick<Type<T>, "class" | "is">
	): Type<T> & D {
		const result = Object.assign(Methods.decorate(type), {
			get data(): D {
				return type
			},
			get: type.get ?? ((value: T | any, fallback?: T): T | undefined => (result.is(value) ? value : fallback)),
			rename(name: string): Type<T> {
				return { ...result, name }
			},
			describe(description: string): Type<T> {
				return { ...result, description }
			},
			// flaw(value: T | any): false | Definition {
			// 	return !result.is(value) && result.definition
			// },
		})
		return result
	}
}
