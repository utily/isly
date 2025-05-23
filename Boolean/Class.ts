import { Base } from "../Base"
import type { isly } from "../index"
import { Restriction } from "./Restriction"

export class Class<V extends boolean> extends Base<V> {
	readonly class = "boolean"
	readonly name: string = "boolean"
	override get definition(): isly.Definition {
		return Object.assign(super.definition, this.allowed === undefined ? {} : { allowed: this.allowed })
	}
	private constructor(readonly allowed?: V) {
		super()
	}
	override is(value: V | any): value is V {
		return typeof value == "boolean"
	}
	override restrict(...restriction: Restriction | Base.Restriction) {
		return super.restrict(...(Base.Restriction.is(restriction) ? restriction : Restriction.convert(restriction)))
	}
	static create<V extends boolean = boolean>(allowed?: V): isly.Boolean<V> {
		const result = new Class<V>(allowed)
		return allowed == undefined ? result : result.restrict(allowed)
	}
}
