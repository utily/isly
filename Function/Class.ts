import { Base } from "../Base"
import type { isly } from "../index"
import type { Function } from "."

export class Class<V extends globalThis.Function = globalThis.Function> extends Base<globalThis.Function> {
	readonly class = "function"
	private constructor(creator: isly.Creator, readonly name: string = "function") {
		super(creator, "Value has to be a function.")
	}
	override is(value: V | any): value is V {
		return typeof value == "function"
	}
	static create<V extends globalThis.Function = globalThis.Function>(creator: isly.Creator, name?: string): Class<V> {
		return new Class<V>(creator, name).modify()
	}
}
export namespace Class {
	export interface Creator {
		<V extends globalThis.Function = globalThis.Function>(type: "function", name?: string): Function<V>
	}
}
