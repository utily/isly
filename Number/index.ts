import { Base } from "../Base"
import { Condition as NumberCondition } from "./Condition"
import { Definition as NumberDefinition } from "./Definition"

export class Number<V extends number = number> extends Base<V, Number<V>> {
	readonly class = "number"
	readonly name: string = "number"
	constructor(readonly allowed?: readonly number[]) {
		super("Any finite numeric value.")
	}
	is(value: V | any): value is V {
		return typeof value == "number" && globalThis.Number.isFinite(value)
	}
	// restrict(...condition: Number.Condition<V>): Number<V> {
	// 	return Number.Condition.restrict(this, ...condition)
	// }
	static create<V extends number = number>(...condition: Number.Condition<V> | []): Number<V> {
		const result: Number<V> = Base.bind(new Number<V>())
		return ((value: any): value is [] => Array.isArray(value) && value.length == 0)(condition)
			? result
			: Number.Condition.restrict(result, ...condition)
	}
}
export namespace Number {
	export type Definition = NumberDefinition
	export import Condition = NumberCondition
}
