import { Base } from "Base"
import { Condition } from "./Condition"

export class Class<V extends number> extends Base<V> {
	readonly class = "number"
	readonly name: string = "number"
	constructor(readonly allowed?: readonly number[]) {
		super("Any finite numeric value.")
	}
	is(value: V | any): value is V {
		return typeof value == "number" && globalThis.Number.isFinite(value)
	}
	// restrict(...condition: Condition<V>): Number<V> {
	// 	return Condition.restrict(this, ...condition)
	// }
	static create<V extends number = number>(...condition: Condition<V> | []): Class<V> {
		return new Class<V>()
		// const result: Class<V> = Base.bind(new Class<V>())
		// return ((value: any): value is [] => Array.isArray(value) && value.length == 0)(condition)
		// 	? result
		// 	: Condition.restrict(result, ...condition)
	}
}
