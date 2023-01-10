import { Flaw } from "./Flaw"
import { Type } from "./Type"

export namespace number {
	export type Criteria = "positive" | "negative" | "integer"
}

const criteriaFunctions: Record<number.Criteria, { is: (value: number) => boolean; condition: string }> = {
	positive: {
		is: (value: number) => value > 0,
		condition: "> 0",
	},
	negative: {
		is: (value: number) => value < 0,
		condition: "< 0",
	},
	integer: {
		is: (value: number) => Number.isInteger(value),
		condition: "Number.isInteger",
	},
}

function fromCriteria(
	criteria: number | number.Criteria | number.Criteria[] | number[] | ((value: number) => boolean)
): [(value: number) => boolean, string] {
	return /* Eg: criteria == 42 */ typeof criteria == "number"
		? [value => value == criteria, " == " + criteria.toString()]
		: // Eg: criteria == [0,1,2]
		((c: any): c is number[] => Array.isArray(c) && c.every(c => typeof c == "number"))(criteria)
		? [value => criteria.map(fromCriteria).some(c => c[0](value)), criteria.join(" | ")]
		: // Eg: criteria ==  ["positive", "negative"]
		((c: any): c is number.Criteria[] =>
				Array.isArray(c) && c.every(c => typeof c == "string" && c in criteriaFunctions))(criteria)
		? [
				value => criteria.map(fromCriteria).every(c => c[0](value)),
				criteria
					.map(fromCriteria)
					.map(c => c[1])
					.join(" & "),
		  ]
		: // Eg: criteria == () => true
		typeof criteria === "function"
		? [criteria, "custom"]
		: // Eg: criteria == "positive"
		criteria in criteriaFunctions
		? [criteriaFunctions[criteria].is, criteriaFunctions[criteria].condition]
		: // Eg: criteria is unknown
		  [() => false, "Unknown criteria"]
}
export function number<N extends number = number>(criteria?: Parameters<typeof fromCriteria>[0]): Type<N> {
	const [isFunction, condition] = criteria == undefined ? [undefined, undefined] : fromCriteria(criteria)
	const name = "number"
	function is(value: any | number): value is N {
		return typeof value == "number" && (!isFunction || isFunction(value))
	}
	function flaw(value: any): true | Flaw {
		return is(value) || { type: name, ...(condition ? { condition } : undefined) }
	}
	return {
		name,
		is,
		flaw,
	}
}
