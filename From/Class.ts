import { Base } from "../Base"
import type { isly } from "../index"

export class Class<V = unknown> extends Base<V> {
	readonly class = "from"
	private constructor(
		readonly name: string,
		override readonly is: (value: V | any) => value is V,
		override readonly prune: (value: V | any) => V | undefined = (value: V | any): V | undefined => super.prune(value)
	) {
		super()
	}
	static create<V = unknown>(
		name: string,
		is: (value: V | any) => value is V,
		prune?: (value: V | any) => V | undefined
	): isly.From<V> {
		return new Class<V>(name, is, prune)
	}
}
