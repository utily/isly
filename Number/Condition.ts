import { Verifier } from "../Verifier"
import type { Number } from "."

export type Condition<T extends number = number> =
	| [category: Exclude<Condition.Category, "range" | "minimum" | "maximum">]
	| [category: "minimum" | "greater" | "maximum" | "less", value: T]
	| [category: "range" | "within", min: T, max: T]
	| [category: "value", values: T[]]
	| [category: "value", ...values: T[]]

export namespace Condition {
	export type Category =
		| "integer"
		| "positive"
		| "negative"
		| "minimum"
		| "greater"
		| "maximum"
		| "less"
		| "range"
		| "within"
		| "value"
	export function restrict<T extends number = number>(result: Number<T>, ...condition: Condition<T>): Number<T> {
		const { verify, description } = getVerifier<T>(...condition)
		return {
			...result,
			condition: [...(result.condition ?? []), description],
			is: (value: T | any): value is T => result.is(value) && verify(value),
		}
	}
	export function getVerifier<T extends number = number>(...condition: Condition<T>): Verifier<T> {
		const verifiers: Record<Condition.Category, (value: T) => boolean> = {
			integer: globalThis.Number.isInteger,
			positive: value => value >= 0,
			negative: value => value < 0,
			minimum: value => value >= (condition[1] as number),
			greater: value => value > (condition[1] as number),
			maximum: value => value <= (condition[1] as number),
			less: value => value < (condition[1] as number),
			range: value => value >= (condition[1] as number) && value <= (condition[2] as number),
			within: value => value > (condition[1] as number) && value < (condition[2] as number),
			value: Array.isArray(condition[1])
				? value => (condition[1] as number[]).some(v => v == value)
				: value => condition.slice(1).some(v => v == value),
		}
		return {
			verify: verifiers[condition[0]],
			description: condition[0] + (condition.length > 1 ? `(${condition.slice(1).join(", ")})` : ""),
		}
	}
}
