import { Base } from "../Base"
import type { isly } from "../index"

export class Class<V = any> extends Base<V> {
	readonly class = "any"
	private constructor(creator: isly.Creator, readonly name: string = "any") {
		super(creator, "Anything except undefined.")
	}
	override is(value: V | any): value is V {
		return value != undefined
	}
	static create<V = any>(creator: isly.Creator, name?: string): Class<V> {
		return new Class<V>(creator, name)
	}
}
