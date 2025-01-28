import { Base } from "../Base"
import { Properties } from "./Properties"

export class Class<V extends object = Record<string, any>> extends Base<V, Class<V>> {
	override readonly class = "object"
	private constructor(
		readonly properties: Readonly<Properties<V>>,
		readonly name: string = Properties.getName(properties)
	) {
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
	extend<R extends V & object>(properties: Properties<Omit<R, keyof V>>, name?: string): Class<R> {
		return Class.create(
			{ ...this.properties, ...properties } as any as Properties<R>,
			name ?? `${this.name} & ${Properties.getName(properties)}`
		)
	}
	omit<K extends keyof V>(omits: readonly K[], name?: string): Class<Omit<V, K>> {
		return Class.create(
			Class.omit<Properties<V>, K>((this as Class<V>).properties, omits) as Properties<Omit<V, K>>,
			name ?? `Omit<${name}, ${omits.map(key => `"${key.toString()}"`).join(" | ")}>`
		)
	}
	pick<K extends keyof V>(picks: readonly K[], name?: string): Class<Pick<V, K>> {
		return Class.create(
			Class.pick<Properties<V>, K>((this as Class<V>).properties, picks) as Properties<Pick<V, K>>,
			name ?? `Pick<${name}, ${picks.map(key => `"${key.toString()}"`).join(" | ")}>`
		)
	}
	static create<V extends object = Record<string, any>>(properties: Readonly<Properties<V>>, name?: string): Class<V> {
		const result = Base.bind(new Class<V>(properties, name))
		return globalThis.Object.assign(result, {
			extend: result.extend.bind(result),
			omit: result.omit.bind(result),
			pick: result.pick.bind(result),
		})
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
Base.register("object", Class.create)
