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
	override restrict(...restriction: Restriction<V>): this
	override restrict(verify: (value: V) => boolean, condition: string, name?: string): this
	override restrict(
		...restriction: Restriction<V> | [verify: (value: V) => boolean, condition: string, name?: string]
	) {
		return restriction.length > 2 && typeof restriction[0] == "function"
			? super.restrict(...restriction)
			: Restriction.restrict(this, ...(restriction as Restriction<V>))
	}
	static create<V extends string = string>(...restriction: Restriction<V> | []): Class<V> {
		const result = new Class<V>()
		return ((value: any): value is [] => Array.isArray(value) && value.length == 0)(restriction)
			? result
			: Restriction.restrict(result, ...restriction)
	}
}
