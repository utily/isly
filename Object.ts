import { Flaw } from "./Flaw"
import { Type } from "./Type"

export class ObjectClass<T> extends Type<T> {
	readonly name: string
	constructor(readonly properties: Object.Properties<T>, name?: string) {
		super()
		this.name =
			name ??
			JSON.stringify(
				globalThis.Object.fromEntries(
					globalThis.Object.entries(properties).map(([property, type]: [string, Type<any>]) => [property, type.name])
				)
			)
	}
	is(value: any | T): value is T {
		return (
			value &&
			typeof value == "object" &&
			!globalThis.Array.isArray(value) &&
			globalThis.Object.entries<Type<any>>(this.properties).every(([property, type]) => type.is(value[property]))
		)
	}
	flaw(value: any): true | Flaw {
		return (
			this.is(value) || {
				type: this.name,
				flaws: globalThis.Object.entries<Type<any>>(this.properties)
					.map<[string, true | Flaw]>(([property, type]) => [property, type.flaw(value[property])])
					.map(([property, flaw]) => flaw == true || { property, ...flaw })
					.filter(f => f != true) as Flaw[],
			}
		)
	}
}
export type Object<T> = ObjectClass<T>
export function object<T>(properties: Object.Properties<T>, type?: string) {
	return new ObjectClass(properties, type)
}
export namespace Object {
	export type Properties<T> = { [P in keyof T]: Type<T[P]> }
}
