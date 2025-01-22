import { Type } from "../Type"
import { Definition as ObjectDefinition } from "./Definition"
import { Methods as ObjectMethods } from "./Methods"
import { Properties as ObjectProperties } from "./Properties"

export type Object<T extends object = Record<string, any>> = Type<T> & Object.Definition<T> & Object.Methods<T>
export namespace Object {
	export import Definition = ObjectDefinition
	export import Methods = ObjectMethods
	export import Properties = ObjectProperties
	export function create<T extends object = Record<string, any>>(
		properties: Object.Properties<T>,
		name?: string
	): Object<T> {
		const result: Object<T> = globalThis.Object.assign(
			Type.create<T, Object.Definition<T>>({
				class: "object",
				name: name ?? Object.nameFromProperties(properties),
				is: (value: T | any): value is T =>
					value &&
					typeof value == "object" &&
					!Array.isArray(value) &&
					globalThis.Object.entries<Type<any>>(properties).every(([property, type]) => type.is(value[property])),
				properties: properties,
			}),
			{
				extend<R extends T & object>(properties: Object.Properties<Omit<R, keyof T>>, name?: string): Object<R> {
					return create(
						{ ...result.properties, ...properties } as any as Object.Properties<R>,
						name ?? `${result.name} & ${Object.nameFromProperties(properties)}`
					)
				},
				omit<K extends keyof T>(omits: readonly K[], name?: string): Object<Omit<T, K>> {
					return create(
						Object.omit<Object.Properties<T>, K>(result.properties, omits) as Object.Properties<Omit<T, K>>,
						name ?? `Omit<${name}, ${omits.map(key => `"${key.toString()}"`).join(" | ")}>`
					)
				},
				pick<K extends keyof T>(picks: readonly K[]): Object<Pick<T, K>> {
					return create(
						Object.pick<Object.Properties<T>, K>(result.properties, picks) as Object.Properties<Pick<T, K>>,
						name ?? `Pick<${name}, ${picks.map(key => `"${key.toString()}"`).join(" | ")}>`
					)
				},
			}
		)
		return result
	}
	export function omit<T extends globalThis.Object, K extends keyof T>(object: T, omits: readonly K[]): Omit<T, K> {
		const keys = globalThis.Object.keys(object).filter(k => omits.every(omit => omit != k)) as Exclude<keyof T, K>[]
		return pick(object, keys)
	}
	export function pick<T extends globalThis.Object, K extends keyof T>(object: T, picks: readonly K[]): Pick<T, K> {
		return globalThis.Object.fromEntries(picks.map(key => [key, object[key]])) as Pick<T, K>
	}
	export function nameFromProperties(properties: Properties<any>): string {
		return `${globalThis.Object.entries<Type<any>>(properties)
			.map(([p, t]) => `${p}: ${t.name}`)
			.join(", ")} }`
	}
}
