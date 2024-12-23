import type { Flaw } from "../Flaw"
import { Type } from "../Type"

export function object(): IslyObject<object>
export function object<T extends object>(properties: object.Properties<T>, name?: string): IslyObject<T>
export function object<T extends object>(properties?: object.Properties<T>, name?: string): IslyObject<T> {
	return new IslyObject<T>(properties ?? ({} as object.Properties<T>), name)
}
export namespace object {
	type TypedProperties<T> = { [P in keyof T]: Type<T[P]> }
	export type Properties<T extends B, B extends object = object> = Required<TypedProperties<Omit<T, keyof B>>> &
		Partial<TypedProperties<Pick<T, keyof B>>>
}
export class IslyObject<T extends B = any, B extends object = object> extends Type<T> {
	readonly class = "object"
	constructor(
		protected readonly properties: object.Properties<T, B>,
		name?: string,
		protected readonly baseType?: IslyObject<B, any>
	) {
		super(
			() =>
				name ??
				(this.baseType ? `${this.baseType.name} & ` : "") +
					`{${globalThis.Object.entries<Type<any>>(this.properties)
						.map(([property, type]) => `${property}: ${type.name}`)
						.join(", ")}}`
		)
	}
	extend<T2 extends T>(properties: object.Properties<T2, T>, name?: string | undefined): IslyObject<T2, T> {
		return new IslyObject<T2, T>(properties, name, this)
	}
	omit<K extends keyof T>(omits: readonly K[], name?: string): IslyObject<Omit<T, K>> {
		return new IslyObject<Omit<T, K>>(
			globalThis.Object.fromEntries(
				globalThis.Object.entries(this.properties).filter(([key]) => !omits.includes(key as any))
			) as any,
			name ?? `Omit<${this.name}, ${omits.map(key => `"${String(key)}"`).join(" | ")}>`,
			this.baseType?.omit(omits as any)
		)
	}
	pick<K extends keyof T>(picks: readonly K[], name?: string): IslyObject<Pick<T, K>> {
		return new IslyObject<Pick<T, K>>(
			globalThis.Object.fromEntries(
				globalThis.Object.entries(this.properties).filter(([key]) => picks.includes(key as any))
			) as any,
			name ?? `Pick<${this.name}, ${picks.map(key => `"${String(key)}"`).join(" | ")}>`,
			this.baseType?.pick(picks as any)
		)
	}
	is = (value: T | any): value is T =>
		!!(
			value &&
			(this.baseType == undefined || this.baseType.is(value)) &&
			typeof value == "object" &&
			!globalThis.Array.isArray(value) &&
			globalThis.Object.entries<Type<any>>(this.properties).every(([property, type]) => type.is(value[property]))
		)
	protected override createFlaw(value: any): Omit<Flaw, "isFlaw" | "type" | "condition"> {
		return {
			flaws: [
				this.baseType ? this.baseType.flaw(value)?.flaws ?? [] : [],
				globalThis.Object.entries<Type<any>>(this.properties)
					.map<[string, undefined | Flaw]>(([property, type]) => [property, type.flaw((value as any)?.[property])])
					.map(([property, flaw]) => (flaw?.isFlaw ?? true) && { property, ...flaw })
					.filter(flaw => flaw) as Flaw[],
			]
				.flat()
				.filter(flaw => flaw?.isFlaw ?? true),
		}
	}
	/**
	 * get-function on a object returns a object with only specified properties
	 */
	protected override getValue(value: T) {
		const result: Record<any, any> = this.baseType ? this.baseType.getValue(value) : {}
		if (result)
			for (const [key, type] of globalThis.Object.entries(this.properties) as [keyof T, Type<any>][])
				if (key in value)
					result[key] = type.get(value[key])

		return result as T
	}
	getProperties(): object.Properties<T, B> {
		return { ...this.baseType?.getProperties(), ...this.properties }
	}
}
