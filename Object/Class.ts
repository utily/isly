import { Base } from "../Base"
import { Flaw } from "../Flaw"
import type { Type } from "../Type"
import { Properties } from "./Properties"

export class Class<V extends object = Record<string, any>> extends Base<V> {
	override readonly class = "object"
	private constructor(readonly properties: Properties<V>, readonly name: string = Properties.getName(properties)) {
		super(`Object of type ${name}.`, [])
	}
	override is(value: V | any): value is V {
		return (
			value &&
			typeof value == "object" &&
			!Array.isArray(value) &&
			globalThis.Object.entries<Base>(this.properties).every(([property, type]) => type.is(value[property]))
		)
	}
	extend<R extends object = Record<string, any>>(properties: Properties<R>, name?: string): Class<V & R> {
		return Class.create(
			{ ...this.properties, ...properties } as Properties<V & R>,
			name ?? `${this.name} & ${Properties.getName(properties)}`
		)
	}
	omit<K extends keyof V>(omits: readonly K[], name?: string): Class<Omit<V, K>> {
		return Class.create(
			Class.omit<Properties<V>, K>(this.properties, omits) as Properties<Omit<V, K>>,
			name ?? `Omit<${name}, ${omits.map(key => `"${key.toString()}"`).join(" | ")}>`
		)
	}
	pick<K extends keyof V>(picks: readonly K[], name?: string): Class<Pick<V, K>> {
		return Class.create(
			Class.pick<Properties<V>, K>(this.properties, picks) as Properties<Pick<V, K>>,
			name ?? `Pick<${name}, ${picks.map(key => `"${key.toString()}"`).join(" | ")}>`
		)
	}
	override flawed(value: V | any): Flaw | false {
		const result: Flaw | false = super.flawed(value)
		return (
			result && {
				...result,
				flaws: Object.entries<Type>(this.properties)
					.map(([property, type]) => [property, type.flawed(value[property])] as const)
					.map(([property, flaw]) => flaw && ({ ...flaw, property } as Flaw))
					.filter((f: Flaw | false): f is Flaw => !f),
			}
		)
	}
	override modify(type?: Partial<this>): this {
		const result = super.modify(type)
		return Object.assign(result, {
			extend: type?.extend ?? this.extend,
			omit: type?.omit ?? this.omit,
			pick: type?.pick ?? this.pick,
		})
	}
	static create<V extends object = Record<string, any>>(properties: Properties<V>, name?: string): Class<V> {
		return new Class<V>(properties, name)
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
