import { Number } from "../Number"
import { Verifier } from "../Verifier"
import type { Array } from "."

export type Condition = Condition.Length

export namespace Condition {
	export type Property = "length"
	export type Length = [property: "length", ...Number.Condition]
	export function restrict<T = any>(type: Array<T>, ...condition: Condition): Array<T> {
		const { verify, description } = getVerifier(...condition)
		const result: Array<T> = {
			...type,
			condition: [...(type.condition ?? []), description],
			is: (value: T[] | any): value is T[] => type.is(value) && verify(value),
		}
		return result
	}
	export function getVerifier<T = any>(...condition: Condition): Verifier<T[]> {
		const conditions: Record<Property, Verifier<T[]>> = {
			length: ((verifier: Verifier<number>): Verifier<T[]> => ({
				verify: (value: T[]): boolean => verifier.verify(value.length),
				description: "length." + verifier.description,
			}))(Number.Condition.getVerifier(...(condition.slice(1) as Number.Condition))),
		}
		return conditions[condition[0]]
	}
}
