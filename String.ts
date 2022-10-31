import { Type } from "./Type"

class StringClass extends Type<string> {
	readonly name = "string"
	constructor() {
		super()
	}
	is(value: any | string): value is string {
		return typeof value == "string"
	}
}
export type String = StringClass
export const string = new StringClass()
