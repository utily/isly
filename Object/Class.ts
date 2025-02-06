import { BindResult } from "BindResult"
import { Base } from "../Base"
import { Flaw } from "../Flaw"
import type { isly } from "../index"
import type { Type } from "../Type"
import { Properties } from "./Properties"

export class Class<V extends object = Record<string, any>> extends Base<V> {
	override readonly class = "object"
	override get definition(): isly.Definition {
		return Object.assign(super.definition, {
			properties: globalThis.Object.fromEntries(Properties.entries(this.properties).map(([p, t]) => [p, t.definition])),
		})
	}
	private constructor(
		creator: typeof isly,
		readonly properties: Properties<V>,
		readonly name: string = Properties.getName(properties)
	) {
		super(creator, `Object of type ${name}.`, [])
	}
	override is(value: V | any): value is V {
		return (
			!!value &&
			typeof value == "object" &&
			!Array.isArray(value) &&
			globalThis.Object.entries<Base>(this.properties).every(([property, type]) => type.is(value[property]))
		)
	}
	override prune(value: V | any): V | undefined {
		return this.is(value) ? Properties.prune(this.properties, value) : undefined
	}
	override flawed(value: V | any): Flaw | false {
		const result: Flaw | false = super.flawed(value)
		return (
			result && {
				...result,
				flaws: Object.entries<Type>(this.properties)
					.map(([property, type]) => [property, type.flawed(value?.[property])] as const)
					.map(([property, flaw]) => flaw && ({ ...flaw, property } as Flaw))
					.filter((f: Flaw | false): f is Flaw => !!f),
			}
		)
	}
	extend<R extends object = Record<string, any>>(
		properties: Properties<Omit<R, keyof V>> & Partial<Properties<V>>,
		name?: string
	): Class<R> {
		return (this as unknown as Class<R>).modify({
			properties: { ...this.properties, ...properties } as unknown as Properties<R>,
			name: name ?? `${this.name} & ${Properties.getName(properties)}`,
		})
	}
	omit<K extends keyof V>(omits: readonly K[], name?: string): Class<Omit<V, K>> {
		return (this as unknown as Class<Omit<V, K>>).modify({
			properties: Class.omit<Properties<V>, K>(this.properties, omits) as Properties<Omit<V, K>>,
			name: name ?? `Omit<${this.name}, ${omits.map(key => `"${key.toString()}"`).join(" | ")}>`,
		})
	}
	pick<K extends keyof V>(picks: readonly K[], name?: string): Class<Pick<V, K>> {
		return (this as unknown as Class<Pick<V, K>>).modify({
			properties: Class.pick<Properties<V>, K>(this.properties, picks) as Properties<Pick<V, K>>,
			name: name ?? `Pick<${this.name}, ${picks.map(key => `"${key.toString()}"`).join(" | ")}>`,
		})
	}
	override modify(type?: Partial<this>): this {
		const result = super.modify(type)
		return Object.assign(result, {
			extend: type?.extend ?? this.extend,
			omit: type?.omit ?? this.omit,
			pick: type?.pick ?? this.pick,
		})
	}
	override bind(): BindResult<V, this> {
		const result = super.bind()
		return Object.assign(result, {
			extend: this.extend.bind(this),
			omit: this.omit.bind(this),
			pick: this.pick.bind(this),
		})
	}
	static create<V extends object = Record<string, any>>(
		creator: typeof isly,
		properties: Properties<V>,
		name?: string
	): Class<V> {
		return new Class<V>(creator, properties, name)
	}
}
export namespace Class {
	export function omit<T extends globalThis.Object, K extends keyof T>(object: T, omits: readonly K[]): Omit<T, K> {
		const keys = globalThis.Object.keys(object).filter(k => omits.every(omit => omit != k)) as Exclude<keyof T, K>[]
		return pick(object, keys)
	}
	export function pick<T extends globalThis.Object, K extends keyof T>(object: T, picks: readonly K[]): Pick<T, K> {
		return globalThis.Object.fromEntries(picks.map(key => [key, object[key]])) as Pick<T, K>
	}
}
