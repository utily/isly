import { isly } from "../index"

export type Depth = typeof Depth.values[number]
export namespace Depth {
	export const values = [1, 2, 3, 4]
	export const { type, is, flawed } = isly.number<Depth>("value", values).rename("Report.Settings.Depth").bind()
}

describe("isly.Number.Depth", () => {
	it("type narrowing", () => {
		const value: number = 52
		if (Depth.is(value)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const data: Depth = value
		}
	})
	it.each([
		[0, false],
		[1, true],
		[2, true],
		[3, true],
		[4, true],
		[5, false],
		[-1, false],
		[null, false],
		[undefined, false],
		["1", false],
	])("is(%s) == %s", (value, expected) => expect(Depth.is(value)).toEqual(expected))
})
