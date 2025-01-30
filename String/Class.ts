import { Base } from "../Base"
import { Restriction } from "./Restriction"

export class Class<V extends string> extends Base<V> {
	readonly class = "string"
	readonly name: string = "string"
	constructor(readonly allowed?: readonly string[]) {
		super("A string value.")
	}
	is(value: V | any): value is V {
		return typeof value == "string"
	}
	// restrict(...condition: Condition<V>): Number<V> {
	// 	return Condition.restrict(this, ...condition)
	// }
	static create<V extends string = string>(...condition: Restriction<V> | []): Class<V> {
		const result = new Class<V>()
		return ((value: any): value is [] => Array.isArray(value) && value.length == 0)(condition)
			? result
			: Restriction.restrict(result, ...condition)
	}
}
