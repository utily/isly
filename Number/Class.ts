import { Base } from "../Base"
import { Restriction } from "./Restriction"

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
	static create<V extends number = number>(...condition: Restriction<V> | []): Class<V> {
		const result: Class<V> = new Class<V>()
		return ((value: any): value is [] => Array.isArray(value) && value.length == 0)(condition)
			? result
			: Restriction.restrict(result, ...condition)
	}
}
