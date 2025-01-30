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
	override restrict(...restriction: Restriction<V>): this
	override restrict(verify: (value: V) => boolean, condition: string, name?: string): this
	override restrict(
		...restriction: Restriction<V> | [verify: (value: V) => boolean, condition: string, name?: string]
	) {
		return restriction.length > 2 && typeof restriction[0] == "function"
			? super.restrict(...restriction)
			: Restriction.restrict(this, ...(restriction as Restriction<V>))
	}
	static create<V extends number = number>(...restriction: Restriction<V> | []): Class<V> {
		const result: Class<V> = new Class<V>()
		return ((value: any): value is [] => Array.isArray(value) && value.length == 0)(restriction)
			? result
			: Restriction.restrict(result, ...restriction)
	}
}
