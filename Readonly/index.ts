import { Base } from "../Base"
import type { Type } from "../Type"
import { Definition as BaseDefinition } from "./Definition"

export interface Readonly<V extends any | undefined = unknown | undefined, B extends Type = Type>
	extends Base<V, Readonly<V, B>> {
	class: "readonly"
	readonly base: B
}
export namespace Readonly {
	export import Definition = BaseDefinition
	export function create<V, B extends Type>(base: B, name?: string): Readonly<V, B> {
		return {
			class: "readonly",
			name: name ?? `Readonly<${base.name}>`,
			description: "Readonly variant of base.",
			base,
			is(value: V | any): value is V {
				return this.base.is(value)
			},
			...Base.generate<V | undefined, Readonly<V, B>>(),
		}
	}
}
Base.register({
	readonly(name?: string): Readonly<any, Type> {
		return Readonly.create(this as Type, name)
	},
})
