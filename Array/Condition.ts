import { Number } from "../Number"
import { Verifier } from "../Verifier"
import type { Array } from "."

export type Condition = Condition.Length

export namespace Condition {
	export type Property = "length"
	export type Length = [property: "length", ...Number.Condition]
	export function restrict<T = any, A extends globalThis.Array<T> = T[]>(
		type: Array<T, A>,
		...condition: Condition
	): Array<T, A> {
		const { verify, description } = getVerifier<T, A>(...condition)
		const result: Array<T, A> = {
			...type,
			condition: [...(type.condition ?? []), description],
			is: (value: A | any): value is A => type.is(value) && verify(value),
		}
		return result
	}
	export function getVerifier<T = any, A extends globalThis.Array<T> = T[]>(...condition: Condition): Verifier<A> {
		const conditions: Record<Property, Verifier<A>> = {
			length: ((verifier: Verifier<number>): Verifier<A> => ({
				verify: (value: A): boolean => verifier.verify(value.length),
				description: "length." + verifier.description,
			}))(Number.Condition.getVerifier(...(condition.slice(1) as Number.Condition))),
		}
		return conditions[condition[0]]
	}
}
