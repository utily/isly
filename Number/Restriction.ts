import { Name } from "../Name"
import { Verifier } from "../Verifier"
import type { Number } from "."

export type Restriction<V extends number = number> =
	| [category: Exclude<Restriction.Category, "range" | "minimum" | "maximum">]
	| [category: "minimum" | "greater" | "maximum" | "less", value: number]
	| [category: "range" | "within", min: number, max: number]
	| [category: "value", ...values: V[]]
	| [category: "value", values: V[]]

export namespace Restriction {
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
	export function restrict<V extends number = number>(type: Number<V>, ...restriction: Restriction<V>): Number<V> {
		const { verify, condition, allowed } = getVerifier<V>(...restriction)
		return type.modify({
			...(allowed ? { name: Name.fromNumber(allowed), description: `One of: ${allowed.join(", ")}.` } : {}),
			condition: [...(type.condition ?? []), condition],
			is: (value: V | any): value is V => type.is(value) && verify(value),
		} as Number<V>)
	}
	export function getVerifier<T extends number = number>(...[category, ...restriction]: Restriction<T>): Verifier<T> {
		const verifiers: Record<Restriction.Category, (value: T) => boolean> = {
			integer: globalThis.Number.isInteger,
			positive: value => value >= 0,
			negative: value => value < 0,
			minimum: value => value >= (restriction[0] as number),
			greater: value => value > (restriction[0] as number),
			maximum: value => value <= (restriction[0] as number),
			less: value => value < (restriction[0] as number),
			range: value => value >= (restriction[0] as number) && value <= (restriction[1] as number),
			within: value => value > (restriction[0] as number) && value < (restriction[1] as number),
			value: Array.isArray(restriction[0])
				? value => (restriction[0] as number[]).some(v => v == value)
				: value => restriction.some(v => v == value),
		}
		return {
			verify: verifiers[category],
			condition: category + (restriction.length > 0 ? `(${restriction.join(", ")})` : ""),
			allowed: category == "value" ? (restriction as T[]) : undefined,
		}
	}
}
