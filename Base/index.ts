import { Class } from "Class"
import type { Array } from "../Array"
import { Flaw } from "../Flaw"
import type { Optional } from "../Optional"
import type { Readonly } from "../Readonly"
import { Definition as BaseDefinition } from "./Definition"

export abstract class Base<V = unknown> {
	abstract readonly class: Class
	abstract readonly name: string
	get definition(): Base.Definition {
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
		return this.bind({
			is: (value: V | any): value is V => previous(value) && verify(value),
			condition: [...(this.condition ?? []), condition],
			name: name ?? this.name,
		})
	}
	rename(name: string): this {
		return this.bind({ name })
	}
	describe(description: string): this {
		return this.bind({ description })
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
	flawed(value: V | any): Flaw | false {
		return (
			!this.is(value) && {
				name: this.name,
				...(this.description ? { description: this.description } : {}),
				...(this.condition ? { condition: this.condition } : {}),
			}
		)
	}
	bind(changes?: any): this {
		// TODO: why can't we use Partial<this> instead?
		const result = { ...this }
		return Object.assign(result, {
			...changes,
			is: (changes?.is ?? this.is).bind(result),
			get: (changes?.get ?? this.get).bind(result),
			extract: (changes?.extract ?? this.extract).bind(result),
			restrict: (changes?.restrict ?? this.restrict).bind(result),
			rename: (changes?.rename ?? this.rename).bind(result),
			describe: (changes?.describe ?? this.describe).bind(result),
			optional: (changes?.optional ?? this.optional).bind(result),
			readonly: (changes?.readonly ?? this.readonly).bind(result),
			array: (changes?.array ?? this.array).bind(result),
			flawed: (changes?.flawed ?? this.flawed).bind(result),
			bind: (changes?.bind ?? this.bind).bind(result),
		})
	}
}
export namespace Base {
	export import Definition = BaseDefinition
}
