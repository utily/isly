import { Base } from "../Base"
import { Name } from "../Name"
import { Verifier } from "../Verifier"

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
	export function convert<V extends number = number>(restriction: Restriction<V>): Base.Restriction<V> {
		const { verify, condition, allowed } = getVerifier<V>(...restriction)
		return allowed ? [verify, condition, Name.fromNumber(allowed)] : [verify, condition]
	}
	export function getVerifier<T extends number = number>(...[category, ...restriction]: Restriction<T>): Verifier<T> {
		const verifiers: Record<Restriction.Category, (value: T) => boolean> = {
			integer: globalThis.Number.isInteger,
			positive: value => value > 0,
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
			condition:
				category +
				(restriction.length > 1
					? `: [${restriction.join(", ")}]`
					: restriction.length == 1
					? `: ${restriction[0]}`
					: ""),
			allowed: category == "value" ? (restriction as T[]) : undefined,
		}
	}
}
