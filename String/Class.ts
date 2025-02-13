import { Base } from "../Base"
import type { isly } from "../index"
import { Restriction } from "./Restriction"

export class Class<V extends string> extends Base<V> {
	readonly class = "string"
	readonly name: string = "string"
	override get definition(): isly.Definition {
		return Object.assign(super.definition, this.allowed === undefined ? {} : { allowed: this.allowed })
	}
	private constructor(readonly allowed?: readonly string[]) {
		super()
	}
	is(value: V | any): value is V {
		return typeof value == "string"
	}
	override restrict(...restriction: Restriction | Base.Restriction) {
		return super.restrict(...(Base.Restriction.is(restriction) ? restriction : Restriction.convert(restriction)))
	}
	static create<V extends string = string>(
		...restriction: [] | isly.String.Restriction<V> | Base.Restriction
	): isly.String<V> {
		const result = new Class<V>()
		return ((value: any): value is [] => Array.isArray(value) && value.length == 0)(restriction)
			? result
			: result.restrict(...restriction)
	}
}
