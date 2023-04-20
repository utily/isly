import { Type } from "./Type"

class IslyBoolean<B extends boolean = boolean> extends Type<B> {
	constructor(protected readonly booleanValue?: B) {
		super(booleanValue == undefined ? "boolean" : booleanValue ? "true" : "false")
	}
	is = (value =>
		typeof value == "boolean" && (this.booleanValue == undefined || value == this.booleanValue)) as Type.IsFunction<B>
}

export function boolean<B extends boolean = boolean>(booleanValue?: B): Type<B> {
	return new IslyBoolean(booleanValue)
}
