import { Flaw } from "./Flaw"
import { Type } from "./Type"

class StringClass extends Type<string> {
	readonly name = "string"
	constructor(readonly strings?: string[]) {
		super()
	}
	is(value: any | string): value is string {
		return typeof value == "string" && (!this.strings || this.strings.includes(value))
	}
	flaw(value: any): true | Flaw {
		return this.is(value) || { type: this.name }
	}
}

export type String = StringClass

export function string(...strings: string[]): StringClass {
	return new StringClass(strings.length == 0 ? undefined : strings)
}
