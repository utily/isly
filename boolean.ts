import { Type } from "./Type"

export function boolean<B extends boolean = boolean>(booleanValue?: B): Type<B> {
	const name = booleanValue == undefined ? "boolean" : booleanValue ? "true" : "false"
	const is = (value =>
		typeof value == "boolean" && (booleanValue == undefined || value == booleanValue)) as Type.IsFunction<B>
	return Type.create(name, is, value => (is(value) ? undefined : { type: name }))
}
