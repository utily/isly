import { Base } from "../Base"
import { Definition as ObjectDefinition } from "./Definition"
import { Properties as ObjectProperties } from "./Properties"

export class Object2<V extends object = Record<string, any>> extends Base<V, Object2<V>> {
	override readonly class = "object"
	private constructor(
		readonly properties: Readonly<Object2.Properties<V>>,
		readonly name: string = Object2.nameFromProperties(properties)
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
	extend<R extends V & object>(properties: Object2.Properties<Omit<R, keyof V>>, name?: string): Object2<R> {
		return Object2.create(
			{ ...this.properties, ...properties } as any as Object2.Properties<R>,
			name ?? `${this.name} & ${Object2.nameFromProperties(properties)}`
		)
	}
	omit<K extends keyof V>(omits: readonly K[], name?: string): Object2<Omit<V, K>> {
		return Object2.create(
			Object2.omit<Object2.Properties<V>, K>((this as Object2<V>).properties, omits) as Object2.Properties<Omit<V, K>>,
			name ?? `Omit<${name}, ${omits.map(key => `"${key.toString()}"`).join(" | ")}>`
		)
	}
	pick<K extends keyof V>(picks: readonly K[], name?: string): Object2<Pick<V, K>> {
		return Object2.create(
			Object2.pick<Object2.Properties<V>, K>((this as Object2<V>).properties, picks) as Object2.Properties<Pick<V, K>>,
			name ?? `Pick<${name}, ${picks.map(key => `"${key.toString()}"`).join(" | ")}>`
		)
	}
	static create<V extends object = Record<string, any>>(
		properties: Readonly<Object2.Properties<V>>,
		name?: string
	): Object2<V> {
		const result = Base.bind(new Object2<V>(properties, name))
		return globalThis.Object.assign(result, {
			extend: result.extend.bind(result),
			omit: result.omit.bind(result),
			pick: result.pick.bind(result),
		})
	}
}
export namespace Object2 {
	export import Definition = ObjectDefinition
	export import Properties = ObjectProperties
	export function omit<T extends globalThis.Object, K extends keyof T>(object: T, omits: readonly K[]): Omit<T, K> {
		const keys = globalThis.Object.keys(object).filter(k => omits.every(omit => omit != k)) as Exclude<keyof T, K>[]
		return pick(object, keys)
	}
	export function pick<T extends globalThis.Object, K extends keyof T>(object: T, picks: readonly K[]): Pick<T, K> {
		return globalThis.Object.fromEntries(picks.map(key => [key, object[key]])) as Pick<T, K>
	}
	export function nameFromProperties(properties: Properties<any>): string {
		return `${globalThis.Object.entries<Base>(properties)
			.map(([p, t]) => `${p}: ${t.name}`)
			.join(", ")} }`
	}
}
