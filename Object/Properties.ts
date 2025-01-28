import { Base } from "../Base"

export type Properties<T extends object> = {
	[P in keyof T]: Base<T[P]>
}
export namespace Properties {
	export function getName(properties: Properties<any>): string {
		return `${globalThis.Object.entries<Base>(properties)
			.map(([p, t]) => `${p}: ${t.name}`)
			.join(", ")} }`
	}
}
