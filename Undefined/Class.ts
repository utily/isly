import { Base } from "../Base"
import type { isly } from "../index"
import type { Undefined } from "."

export class Class<V extends undefined = undefined> extends Base<undefined> {
	readonly class = "undefined"
	private constructor(creator: isly.Creator, readonly name: string = "undefined") {
		super(creator, "Value has to be undefined.")
	}
	override is(value: V | any): value is V {
		return value === undefined
	}
	static create<V extends undefined = undefined>(creator: isly.Creator, name?: string): Class<V> {
		return new Class<V>(creator, name).modify()
	}
}
export namespace Class {
	export interface Creator {
		<V extends undefined = undefined>(name?: string): Undefined<V>
	}
}
