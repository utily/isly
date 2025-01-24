import { Base } from "../Base"
import type { Type } from "../Type"
import { Definition as BaseDefinition } from "./Definition"

export interface Optional<V extends any | undefined = unknown | undefined, B extends Type = Type>
	extends Base<V, Optional<V, B>> {
	class: "optional"
	readonly base: B
}
export namespace Optional {
	export import Definition = BaseDefinition
	export function create<V, B extends Type>(base: B, name?: string): Optional<V, B> {
		const result: Optional<V, B> = {
			class: "optional",
			name: name ?? `${base.name} | undefined`,
			description: "Value is optional or base type.",
			base,
			is(value: V | any): value is V {
				return value === undefined || this.base.is(value)
			},
			...Base.generate<V | undefined, Optional<V, B>>(),
		}
		return result.bind()
	}
}
Base.register({
	optional(name?: string): Optional<any, Type> {
		return Optional.create(this as Type, name)
	},
})
