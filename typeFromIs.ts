import { Type } from "./Type"

/**
 * Function to quick create a isly.Type from an existing is-function
 *
 * @param config
 */
export function typeFromIs<T>(name: string, is: Type.IsFunction<T>): Type<T> {
	const flaw = (value => (is(value) ? undefined : { type: name })) as Type.FlawFunction<T>
	return Type.create(name, is, flaw)
}
