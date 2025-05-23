import { Base } from "../Base"
import { Name } from "../Name"
import { Number } from "../Number"
import { Verifier } from "../Verifier"

export type Restriction<V extends string = string> =
	| [property: "length", ...Number.Restriction]
	| [property: "value", ...V[]]
	| [property: "value", V[] | RegExp]

export namespace Restriction {
	export type Property = "length" | "value"
	export function convert<V extends string = string>(restriction: Restriction<V>): Base.Restriction<V> {
		const { verify, condition, allowed } = getVerifier<V>(...restriction)
		return allowed ? [verify, condition, Name.fromString(allowed)] : [verify, condition]
	}
	export function getVerifier<V extends string = string>(...[property, ...argument]: Restriction): Verifier<V> {
		const argument0 = argument[0]
		const conditions: Record<Property, Verifier<V>> = {
			value:
				argument0 instanceof RegExp
					? {
							condition: `value: ${argument0.toString()}`,
							verify: (value: V): boolean => argument0.test(value),
					  }
					: ((allowed: V[]): Verifier<V> => ({
							allowed,
							condition: `value: ${
								allowed.length == 1 ? `'${allowed[0]}'` : `[${allowed.map(a => `'${a}'`).join(", ")}]`
							}`,
							verify: (value: V): boolean => allowed.some(a => a == value),
					  }))((Array.isArray(argument0) ? argument0 : argument) as V[]),
			length: ((verifier: Verifier<number>): Verifier<V> => ({
				verify: (value: V): boolean => verifier.verify(value.length),
				condition: "length." + verifier.condition,
			}))(Number.Restriction.getVerifier(...(argument as Number.Restriction))),
		}
		return conditions[property]
	}
}
