import { Base } from "../Base"
import type { isly } from "../index"

export class Class<V = unknown> extends Base<V> {
	readonly class = "unknown"
	private constructor(creator: isly.Creator, readonly name: string = "unknown") {
		super(creator, "Value can be anything not undefined.")
	}
	override is(value: V | any): value is V {
		return value != undefined
	}
	static create<V extends undefined = undefined>(creator: isly.Creator, name?: string): Class<V> {
		return new Class<V>(creator, name)
	}
}
