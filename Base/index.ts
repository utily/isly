import { Class } from "Class"
import { Definition } from "Definition"
import type { Array } from "../Array"
import type { Optional } from "../Optional"
import type { Readonly } from "../Readonly"
import type { Type } from "../Type"
import { Definition as BaseDefinition } from "./Definition"

export abstract class Base<V = unknown, T extends Base<V, T> = Base<V, any>> {
	abstract readonly class: Class
	abstract readonly name: string
	get definition(): Definition {
		throw new Error("Not implemented")
	}
	constructor(readonly description?: string, readonly condition?: string[]) {}
	abstract is(value: V | any): value is V
	get(value: V | any): V | undefined
	get(value: V | any, fallback: V): V
	get(value: V | any, fallback?: V): V | undefined {
		return this.is(value) ? value : fallback
	}
	extract(value: V | any): V | undefined {
		return this.is(value) ? value : undefined
	}
	restrict(verify: (value: V) => boolean, condition: string, name?: string): T {
		const previous = this.is
		return {
			...this,
			is: (value: V | any): value is V => previous(value) && verify(value),
			condition: [...(this.condition ?? []), condition],
			name: name ?? this.name,
		} as unknown as T
	}
	rename(name: string): T {
		return { ...this, name } as unknown as T
	}
	describe(description: string): T {
		return { ...this, description } as unknown as T
	}
	optional(name?: string): Optional<V | undefined, T> {
		throw new Error("Not implemented")
	}
	readonly(name?: string): Readonly<V, T> {
		throw new Error("Not implemented")
	}
	array(name?: string): Array<V, T> {
		throw new Error("Not implemented")
	}
}
export namespace Base {
	export import Definition = BaseDefinition
	const creators: Partial<Record<Class, (...argument: any[]) => Type>> = {}
	export function register(type: Class, creator: (...argument: any[]) => Type): void {
		creators[type] = creator
	}
	export function instantiate(type: Class, ...argument: any[]): Type | undefined {
		return creators[type]?.(...argument)
	}
	export function bind<V = unknown, T extends Base<V, T> = Base<V, any>>(type: T): T {
		const result = { ...type }
		result.is = type.is.bind(result)
		result.get = type.get.bind(result)
		result.extract = type.extract.bind(result)
		result.restrict = type.restrict.bind(result)
		result.rename = type.rename.bind(result)
		result.describe = type.describe.bind(result)
		result.optional = type.optional.bind(result)
		result.readonly = type.readonly.bind(result)
		result.array = type.array.bind(result)
		return result
	}
}
