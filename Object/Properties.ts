import { Base } from "../Base"
import { Name } from "../Name"
import { system } from "../system"

export type Properties<T extends object> = {
	[P in keyof T]: Base<T[P]>
}
export namespace Properties {
	export function entries<T extends object>(properties: Properties<T>): [keyof T, Base<T[keyof T]>][] {
		return system.Object.entries<Base>(properties) as [keyof T, Base<T[keyof T]>][]
	}
	export function getName(properties: Properties<any>): Name {
		return `{ ${Properties.entries(properties)
			.map(([p, t]) => `${p.toString()}: ${t.name}`)
			.join(", ")} }`
	}
	export function prune<T extends object>(properties: Properties<T>, value: T): T {
		return system.Object.fromEntries(
			Properties.entries(properties)
				.map(([p, t]) => [p, t.prune(value[p])])
				.filter(([p, v]) => v !== undefined)
		) as T
	}
	export function optional<T extends object>(properties: Properties<T>): Properties<Partial<T>> {
		return system.Object.fromEntries(
			Properties.entries(properties).map(([p, t]) => [p, t.optional()])
		) as unknown as Properties<Partial<T>>
	}
}
