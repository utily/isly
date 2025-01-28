import { Base } from "../Base"
import { Number } from "../Number"
import { Verifier } from "../Verifier"
import type { Array } from "."

export type Condition = Condition.Length

export namespace Condition {
	export type Property = "length"
	export type Length = [property: "length", ...Number.Condition]
	export function restrict<V = unknown, B extends Base<V, B> = Base<V>>(
		type: Array<V, B>,
		...condition: Condition
	): Array<V, B> {
		const { verify, description } = getVerifier<V, B>(...condition)
		return {
			...type,
			condition: [...(type.condition ?? []), description],
			is: (value: V | any): value is V => type.is(value) && verify(value),
		} as unknown as Array<V, B>
	}
	export function getVerifier<V = unknown, B extends Base<V, B> = Base<V>>(...condition: Condition): Verifier<V[]> {
		const conditions: Record<Property, Verifier<V[]>> = {
			length: ((verifier: Verifier<number>): Verifier<V[]> => ({
				verify: (value: V[]): boolean => verifier.verify(value.length),
				description: "length." + verifier.description,
			}))(Number.Condition.getVerifier(...(condition.slice(1) as Number.Condition))),
		}
		return conditions[condition[0]]
	}
}
