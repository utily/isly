import { Base } from "../Base"
import type { isly } from "../index"
import { Definition as BaseDefinition } from "./Definition"

export class Any<V = any> extends Base<V, Any.Configuration<V>> {
	readonly class = "any"
	private constructor(configuration: Any.Configuration<V>) {
		super(configuration)
	}
	override is(value: V | any): value is V {
		return value != undefined && (this.configuration.is?.(value) ?? true)
	}
	override copy<W extends V = V>(changes?: Any.Configuration<W> | undefined): Any<W> {
		return new Any({ ...this.configuration, ...changes })
	}
	static create<V = any>(name?: string): isly.Any<V> {
		return new Any<V>(name)
	}
}
export namespace Any {
	export import Definition = BaseDefinition
	export type Configuration<V = any> = Base.Configuration<V>
}
