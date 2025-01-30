import { Name } from "../Name"
import { Number } from "../Number"
import { Verifier } from "../Verifier"
import type { String } from "."

export type Restriction<V extends string = string> =
	| [property: "length", ...Number.Restriction]
	| [property: "value", ...V[]]
	| [property: "value", V[]]

export namespace Restriction {
	export type Property = "length" | "value"
	export function restrict<V extends string = string>(type: String<V>, ...restriction: Restriction): String<V> {
		const { condition, verify, allowed } = getVerifier<V>(...restriction)
		return type.modify({
			...(allowed ? { name: Name.fromString(allowed), description: `One of: ${allowed.join(", ")}.` } : {}),
			condition: [...(type.condition ?? []), condition],
			is: (value: V | any): value is V => type.is(value) && verify(value),
		})
	}
	export function getVerifier<V extends string = string>(...[property, ...argument]: Restriction): Verifier<V> {
		const argument0 = argument[0]
		const conditions: Record<Property, Verifier<V>> = {
			value: ((allowed: V[]): Verifier<V> => ({
				allowed,
				condition: `value: ${allowed.map(a => `'${a}'`).join(" | ")}`,
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
