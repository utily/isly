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
	override restrict(...restriction: Restriction | Base.Restriction) {
		return super.restrict(...(Base.Restriction.is(restriction) ? restriction : Restriction.convert(restriction)))
	}
	static create<V extends string = string>(...restriction: [] | Restriction<V> | Base.Restriction): Class<V> {
		const result = new Class<V>()
		return ((value: any): value is [] => Array.isArray(value) && value.length == 0)(restriction)
			? result
			: result.restrict(...restriction)
	}
}
