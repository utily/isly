import { Base } from "../Base"
import type { isly } from "../index"

export class Class<V = unknown> extends Base<V> {
	readonly class = "from"
	private constructor(
		creator: typeof isly,
		readonly name: string,
		override readonly is: (value: V | any) => value is V,
		override readonly prune: (value: V | any) => V | undefined = (value: V | any): V | undefined => super.prune(value)
	) {
		super(creator, "Value has to fulfill custom predicate.")
	}
	static create<V = unknown>(
		creator: typeof isly,
		name: string,
		is: (value: V | any) => value is V,
		prune?: (value: V | any) => V | undefined
	): Class<V> {
		return new Class<V>(creator, name, is, prune)
	}
}
