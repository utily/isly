import { Base } from "../Base"
import { Definition as BaseDefinition } from "./Definition"

export interface Undefined extends Base<undefined, Undefined> {
	class: "undefined"
}
export namespace Undefined {
	export import Definition = BaseDefinition
	export function create(name?: string): Undefined {
		return {
			class: "undefined",
			name: name ?? `undefined`,
			description: "Value has to be undefined.",
			is(value: undefined | any): value is undefined {
				return value === undefined
			},
			...Base.generate<undefined, Undefined>(),
		}
	}
}
