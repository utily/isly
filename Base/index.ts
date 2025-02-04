import type { Array } from "../Array"
import { Class } from "../Class"
import type { Definition } from "../Definition"
import { Flaw } from "../Flaw"
import { Name } from "../Name"
import type { Optional } from "../Optional"
import type { Readonly } from "../Readonly"
import { Definition as BaseDefinition } from "./Definition"
import { Restriction as BaseRestriction } from "./Restriction"

export abstract class Base<V = unknown> {
	abstract readonly class: Class
	abstract readonly name: Name
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
	prune(value: V | any): V | undefined {
		return this.is(value) ? value : undefined
	}
	flawed(value: V | any): Flaw | false {
		return (
			!this.is(value) && {
				name: this.name,
				...(this.description ? { description: this.description } : {}),
				...(this.condition && this.condition.length > 0 ? { condition: this.condition } : {}),
			}
		)
	}
	restrict(...restriction: Base.Restriction): this {
		const previous = this.is.bind(this)
		return this.modify({
			is: (value: V | any): value is V => previous(value) && restriction[0](value),
			condition: [...(this.condition ?? []), restriction[1]],
			name: restriction[2] ?? this.name,
			...(restriction[3] ? { description: restriction[3] } : {}),
		} as Partial<this>)
	}
	rename(name: string): this {
		return this.modify({ name } as Partial<this>)
	}
	describe(description: string): this {
		return this.modify({ description } as Partial<this>)
	}
	optional(name?: string): Optional<V | undefined, this> {
		throw new Error("Not implemented")
	}
	readonly(name?: string): Readonly<V, this> {
		throw new Error("Not implemented")
	}
	array(...restriction: Array.Restriction | []): Array<V, this> {
		throw new Error("Not implemented")
	}
	modify(changes?: Partial<this>): this {
		const result = { ...this }
		return Object.assign(result, {
			...changes,
			is: changes?.is ?? this.is,
			get: changes?.get ?? this.get,
			prune: changes?.prune ?? this.prune,
			flawed: changes?.flawed ?? this.flawed,
			restrict: changes?.restrict ?? this.restrict,
			rename: changes?.rename ?? this.rename,
			describe: changes?.describe ?? this.describe,
			optional: changes?.optional ?? this.optional,
			readonly: changes?.readonly ?? this.readonly,
			array: changes?.array ?? this.array,
			modify: changes?.modify ?? this.modify,
		})
	}
}
export namespace Base {
	export import Definition = BaseDefinition
	export import Restriction = BaseRestriction
}
