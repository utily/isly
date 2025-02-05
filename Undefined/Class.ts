import { Base } from "../Base"
import type { isly } from "../index"

export class Class<V extends undefined = undefined> extends Base<undefined> {
	readonly class = "undefined"
	private constructor(creator: typeof isly, readonly name: string = "undefined") {
		super(creator, "Value has to be undefined.")
	}
	override is(value: V | any): value is V {
		return value === undefined
	}
	static create<V extends undefined = undefined>(creator: typeof isly, name?: string): Class<V> {
		return new Class<V>(creator, name)
	}
}
