import { isly } from "../index"

export interface Values {
	readonly opening: number
	readonly period: number
	readonly closing: number
}
export namespace Values {
	export const { type, is, flawed } = isly
		.object<Values>({ opening: isly.number(), period: isly.number(), closing: isly.number() }, "isly.Lazy.test.Values")
		.bind()
	export const zero: Values = { opening: 0, period: 0, closing: 0 }
	export function add(left: Values | undefined, right: Values | undefined): Values {
		return Object.fromEntries(
			(["opening", "period", "closing"] as const).map(key => [key, (left?.[key] ?? 0) + (right?.[key] ?? 0)] as const)
		) as Values
	}
}

export interface Entry extends Values {
	account: number
}
export namespace Entry {
	export const { type, is, flawed } = Values.type
		.extend<Entry>({
			account: isly.number(),
		})
		.bind()
}

export type Group = Partial<Node> & { readonly totals: Values }
interface Node {
	readonly [name: string]: Group | Entry[]
}
export namespace Group {
	export const type: isly.Intersection<Group> = isly.intersection(
		isly.record<Node>(
			isly.string(),
			isly.union(
				isly.lazy<Group>(() => type),
				Entry.type.array()
			)
		),
		isly.object({ totals: Values.type })
	)
}
describe("isly.Lazy.Group", () => {
	it.each([
		{
			account: 1080,
			opening: 0,
			period: 0,
			closing: 0,
		},
		{
			account: 1088,
			opening: 0,
			period: 0,
			closing: 0,
		},
	] as const)("is(%s)", value => {
		expect(Entry.is(value)).toBe(true)
	})
})
