import { Base } from "../Base"
import type { isly } from "../index"

export class Class<V extends undefined = undefined> extends Base<undefined> {
	readonly class = "undefined"
	private constructor(readonly name: string = "undefined") {
		super()
	}
	override is(value: V | any): value is V {
		return value === undefined
	}
	static create<V extends undefined = undefined>(name?: string): isly.Undefined<V> {
		return new Class<V>(name)
	}
}
