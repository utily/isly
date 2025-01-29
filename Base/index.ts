import { Class } from "Class"
import { Definition } from "Definition"
import type { Array } from "../Array"
import type { Optional } from "../Optional"
import type { Readonly } from "../Readonly"
import { Definition as BaseDefinition } from "./Definition"

export abstract class Base<V = unknown> {
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
	restrict(verify: (value: V) => boolean, condition: string, name?: string): this {
		const previous = this.is
		return {
			...this,
			is: (value: V | any): value is V => previous(value) && verify(value),
			condition: [...(this.condition ?? []), condition],
			name: name ?? this.name,
		}
	}
	rename(name: string): this {
		return { ...this, name }
	}
	describe(description: string): this {
		return { ...this, description }
	}
	optional(name?: string): Optional<V | undefined, this> {
		throw new Error("Not implemented")
	}
	readonly(name?: string): Readonly<V, this> {
		throw new Error("Not implemented")
	}
	array(name?: string): Array<V, this> {
		throw new Error("Not implemented")
	}
	bind(type: this): this {
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
	// bind(type?: Partial<this>): this {
	// 	const result = { ...this, ...type } as unknown as T
	// 	result.is = (type?.is ?? result.is).bind(result)
	// 	result.get = (type?.get ?? result.get).bind(result)
	// 	result.extract = (type?.extract ?? result.extract).bind(result)
	// 	result.restrict = (type?.restrict ?? result.restrict).bind(result)
	// 	result.rename = (type?.rename ?? result.rename).bind(result)
	// 	result.describe = (type?.describe ?? result.describe).bind(result)
	// 	result.optional = (type?.optional ?? result.optional).bind(result)
	// 	result.readonly = (type?.readonly ?? result.readonly).bind(result)
	// 	result.array = (type?.array ?? result.array).bind(result)
	// 	return result
	// }
}
export namespace Base {
	export import Definition = BaseDefinition
}
