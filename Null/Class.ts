import { Base } from "../Base"
import type { isly } from "../index"

export class Class<V extends null = null> extends Base<null> {
	readonly class = "null"
	private constructor(creator: isly.Creator, readonly name: string = "null") {
		super(creator, "Value has to be null.")
	}
	override is(value: V | any): value is V {
		return value === null
	}
	static create<V extends null = null>(creator: isly.Creator): Class<V> {
		return new Class<V>(creator)
	}
}
