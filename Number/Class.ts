import { Base } from "../Base"
import type { isly } from "../index"
import type { Number } from "."
import { Restriction } from "./Restriction"

export class Class<V extends number> extends Base<V> {
	readonly class = "number"
	readonly name: string = "number"
	override get definition(): isly.Definition {
		return Object.assign(super.definition, this.allowed === undefined ? {} : { allowed: this.allowed })
	}
	private constructor(creator: isly.Creator, readonly allowed?: readonly number[]) {
		super(creator, "Any finite numeric value.")
	}
	is(value: V | any): value is V {
		return typeof value == "number" && globalThis.Number.isFinite(value)
	}
	override restrict(...restriction: Restriction | Base.Restriction) {
		return super.restrict(...(Base.Restriction.is(restriction) ? restriction : Restriction.convert(restriction)))
	}
	static create<V extends number = number>(
		creator: isly.Creator,
		...restriction: [] | Restriction<V> | Base.Restriction
	): Class<V> {
		const result: Class<V> = new Class<V>(creator).modify()
		return ((value: any): value is [] => Array.isArray(value) && value.length == 0)(restriction)
			? result
			: result.restrict(...restriction)
	}
}
export namespace Class {
	export interface Creator {
		<V extends number = number>(type: "number"): Number<V>
		<V extends number = number>(
			type: "number",
			...restriction: [] | Number.Restriction<V> | Base.Restriction
		): Number<V>
	}
}
