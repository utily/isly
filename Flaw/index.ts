import { Base } from "../Base"
import type { isly } from "../index"
export interface Flaw {
	readonly name: string
	readonly description?: string
	readonly condition?: string[]
	readonly flaws?: readonly (Flaw & ({ index?: number } | { property: string }))[]
}
export namespace Flaw {
	export const type: isly.Type<Flaw> = Base.isly.object<Flaw>(
		{
			name: Base.isly.string().readonly(),
			description: Base.isly.string().optional().readonly(),
			condition: Base.isly.string().array().optional(),
			flaws: Base.isly
				.intersection(
					Base.isly.lazy<Flaw>(() => type, "isly.Flaw"),
					Base.isly.union(
						Base.isly.object({ index: Base.isly.number().optional() }),
						Base.isly.object({ property: Base.isly.string() })
					)
				)
				.optional() as unknown as isly.Type<Flaw["flaws"]>, // TODO: remove cast
		},
		"isly.Flaw"
	)
	export const { is, flawed } = type.bind()
}
