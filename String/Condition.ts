import { Number } from "../Number"
import { Verifier } from "../Verifier"
import type { String } from "."

export type Condition = Condition.Length

export namespace Condition {
	export type Property = "length"
	export type Length = [property: "length", ...Number.Condition]
	export function restrict<T extends string = string>(result: String<T>, ...condition: Condition): String<T> {
		const { verify, description } = getVerifier(...condition)
		return {
			...result,
			condition: [...(result.condition ?? []), description],
			is: (value: T | any): value is T => result.is(value) && verify(value),
		}
	}
	export function getVerifier<T extends string = string>(...condition: Condition): Verifier<T> {
		const conditions: Record<Property, Verifier<T>> = {
			length: ((verifier: Verifier<number>): Verifier<T> => ({
				verify: (value: T): boolean => verifier.verify(value.length),
				description: "length." + verifier.description,
			}))(Number.Condition.getVerifier(...(condition.slice(1) as Number.Condition))),
		}
		return conditions[condition[0]]
	}
}
