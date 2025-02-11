import { Base } from "../Base"
import { Number } from "../Number"
import { Verifier } from "../Verifier"
import type { Array } from "."

export type Restriction = Restriction.Length

export namespace Restriction {
	export type Property = "length"
	export type Length = [property: "length", ...Number.Restriction]
	export function convert(restriction: Restriction): Base.Restriction {
		const { verify, condition } = getVerifier(...restriction)
		return [verify, condition]
	}
	export function restrict<V = unknown, B extends Base<V> = Base<V>>(
		type: Array<V, B>,
		...restriction: Restriction
	): Array<V, B> {
		const { verify, condition } = getVerifier<V>(...restriction)
		return type.restrict(verify, condition)
	}
	export function getVerifier<V = unknown>(...condition: Restriction): Verifier<V[]> {
		const conditions: Record<Property, Verifier<V[]>> = {
			length: ((verifier: Verifier<number>): Verifier<V[]> => ({
				verify: (value: V[]): boolean => verifier.verify(value.length),
				condition: "length." + verifier.condition,
			}))(Number.Restriction.getVerifier(...(condition.slice(1) as Number.Restriction))),
		}
		return conditions[condition[0]]
	}
}
