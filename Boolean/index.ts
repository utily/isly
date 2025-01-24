import { Base } from "../Base"
import { Definition as BaseDefinition } from "./Definition"

export interface Boolean<V extends boolean = boolean> extends Base<V, Boolean<V>> {
	class: "boolean"
	readonly allowed?: V
	// restrict(value: V, name?: string): Boolean<V>
	// restrict(verify: (value: V) => boolean, condition: string, name?: string): Boolean<V>
}
export namespace Boolean {
	export import Definition = BaseDefinition
	export function create<V extends boolean = boolean>(allowed?: V): Boolean<V> {
		let result: Boolean<V> & { allowed?: V } = {
			class: "boolean",
			name: "boolean",
			description: "Value has to be true or false.",
			is(value: V | any): value is V {
				return typeof value == "boolean"
			},
			...Base.generate<V, Boolean<V>>(),
		}
		if (allowed !== undefined) {
			result.allowed = allowed
			result = result.restrict(value => value == allowed, `equals ${allowed}`, allowed.toString())
		}
		return result.bind()
	}
}
