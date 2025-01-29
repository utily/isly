import { Number } from "../Number"
import { Verifier } from "../Verifier"
import type { String } from "."

export type Condition<V extends string = string> =
	| [property: "length", ...Number.Condition]
	| [property: "value", ...V[]]
	| [property: "value", V[]]

export namespace Condition {
	export type Property = "length" | "value"
	export function restrict<V extends string = string>(type: String<V>, ...condition: Condition): String<V> {
		const { verify, description } = getVerifier<V>(...condition)
		return {
			...type,
			condition: [...(type.condition ?? []), condition],
			description,
			is: (value: V | any): value is V => type.is(value) && verify(value),
		} as unknown as String<V>
	}
	export function getVerifier<V extends string = string>(...[property, ...argument]: Condition): Verifier<V> {
		const argument0 = argument[0]
		const conditions: Record<Property, Verifier<V>> = {
			value: ((allowed: string[]): Verifier<V> => ({
				verify: (value: V): boolean => allowed.some(a => a == value),
				description: `value: ${allowed.map(a => `"${a}"`).join(" | ")}`,
			}))(Array.isArray(argument0) ? argument0 : (argument as string[])),
			length: ((verifier: Verifier<number>): Verifier<V> => ({
				verify: (value: V): boolean => verifier.verify(value.length),
				description: "length." + verifier.description,
			}))(Number.Condition.getVerifier(...(argument as Number.Condition))),
		}
		return conditions[property]
	}
}
