import { Flaw } from "./Flaw"
import { Type } from "./Type"

class NumberClass extends Type<number> {
	readonly name = "number"
	constructor(private readonly criteria?: (value: number) => boolean, readonly condition?: string) {
		super()
	}
	is(value: any | number): value is number {
		return typeof value == "number" && (!this.criteria || this.criteria(value))
	}
	flaw(value: any): true | Flaw {
		return this.is(value) || { type: this.name }
	}
}
export type Number = NumberClass
export namespace Number {
	export type Criteria = "positive" | "negative" | "integer"
}
export function number(
	criteria?: number | Number.Criteria | Number.Criteria[] | number[] | ((value: number) => boolean)
) {
	function fromCriteria(
		criteria: number | Number.Criteria | Number.Criteria[] | number[] | ((value: number) => boolean)
	): [(value: number) => boolean, string] {
		return typeof criteria == "number"
			? [value => value == criteria, " == " + criteria.toString()]
			: criteria == "positive"
			? [value => value > 0, "> 0"]
			: criteria == "negative"
			? [value => value < 0, "< 0"]
			: criteria == "integer"
			? [Number.isInteger, "Number.isInteger"]
			: ((c: any): c is number[] => Array.isArray(c) && c.every(c => typeof c == "number"))(criteria)
			? [value => criteria.map(fromCriteria).some(c => c[0](value)), criteria.join(" | ")]
			: ((c: any): c is Number.Criteria[] => Array.isArray(c) && c.every(c => typeof c == "string"))(criteria)
			? [
					value => criteria.map(fromCriteria).every(c => c[0](value)),
					criteria
						.map(fromCriteria)
						.map(c => c[1])
						.join(" & "),
			  ]
			: [criteria, "custom"]
	}
	return criteria == undefined ? new NumberClass() : new NumberClass(...fromCriteria(criteria))
}
