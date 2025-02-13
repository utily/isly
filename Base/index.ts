import { BindResult } from "../BindResult"
import { Class } from "../Class"
import { Codec } from "../Codec"
import { Flaw } from "../Flaw"
import type { isly } from "../index"
import { Name } from "../Name"
import { Definition as BaseDefinition } from "./Definition"
import { Restriction as BaseRestriction } from "./Restriction"

export abstract class Base<V = unknown> {
	abstract readonly class: Class
	abstract readonly name: Name
	get definition(): isly.Definition {
		return {
			name: this.name,
			...(this.description ? { description: this.description } : {}),
			...(this.condition ? { condition: this.condition } : {}),
		}
	}
	get codec(): Codec {
		return Codec.create(this.class)
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
	serialize(value: V): string | undefined {
		const result = this.get(value)
		return result != undefined ? this.codec.encode(result) : undefined
	}
	parse(data: string): V | undefined {
		return this.get(this.codec.decode(data))
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
	optional(name?: string): isly.Optional<V | undefined, this> {
		return Base.isly.optional(this, name)
	}
	readonly(name?: string): isly.Readonly<V, this> {
		return Base.isly.readonly(this, name)
	}
	array(...restriction: isly.Array.Restriction | []): isly.Array<V, this> {
		return Base.isly.array(this, ...restriction)
	}
	toString(): string {
		return JSON.stringify(this.definition)
	}
	toJSON() {
		return { class: this.class, ...this.definition }
	}
	modify(changes?: Partial<this>): this {
		const result = { ...this, name: changes?.name ?? this.name }
		Object.defineProperty(result, "definition", {
			get:
				getPropertyDescriptor(changes, "definition")?.get ??
				getPropertyDescriptor(this, "definition")?.get ??
				((): any => {
					throw Error("Not Implemented")
				}),
			enumerable: true,
			configurable: false,
		})
		Object.defineProperty(result, "codec", {
			get:
				getPropertyDescriptor(changes, "codec")?.get ??
				getPropertyDescriptor(this, "codec")?.get ??
				((): any => {
					throw Error("Not Implemented")
				}),
			enumerable: true,
			configurable: false,
		})
		return Object.assign(result, {
			...changes,
			is: changes?.is ?? this.is,
			get: changes?.get ?? this.get,
			prune: changes?.prune ?? this.prune,
			flawed: changes?.flawed ?? this.flawed,
			serialize: changes?.serialize ?? this.serialize,
			parse: changes?.parse ?? this.parse,
			restrict: changes?.restrict ?? this.restrict,
			rename: changes?.rename ?? this.rename,
			describe: changes?.describe ?? this.describe,
			optional: changes?.optional ?? this.optional,
			readonly: changes?.readonly ?? this.readonly,
			array: changes?.array ?? this.array,
			toString: changes?.toString ?? this.toString,
			toJSON: changes?.toJSON ?? this.toJSON,
			modify: changes?.modify ?? this.modify,
			bind: changes?.bind ?? this.bind,
		})
	}
	bind(): BindResult<V, this> {
		return {
			...this,
			type: this,
			is: this.is.bind(this),
			get: this.get.bind(this),
			prune: this.prune.bind(this),
			flawed: this.flawed.bind(this),
			serialize: this.serialize.bind(this),
			parse: this.parse.bind(this),
			restrict: this.restrict.bind(this),
			rename: this.rename.bind(this),
			describe: this.describe.bind(this),
			optional: this.optional.bind(this),
			readonly: this.readonly.bind(this),
			array: this.array.bind(this),
			toString: this.toString.bind(this),
			toJSON: this.toJSON.bind(this),
			modify: this.modify.bind(this),
			// bind not included as you can't bind twice
		}
	}
	static isly: isly.Creator
}
export namespace Base {
	export import Definition = BaseDefinition
	export import Restriction = BaseRestriction
}

function getPropertyDescriptor(object: any, property: string): PropertyDescriptor | undefined {
	let result = object
	while (result && !Object.prototype.hasOwnProperty.call(result, property))
		result = Object.getPrototypeOf(result)
	return result ? Object.getOwnPropertyDescriptor(result, property) : undefined
}
