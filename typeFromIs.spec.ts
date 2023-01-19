import "jest"
import * as isly from "./index"

describe("isly.typeFromIs", () => {
	type Specific = "Specific"
	const specificIsFunction = ((value: any) => value == "Specific") as isly.Type.IsFunction<Specific>

	// TypeScript compile error if not working
	it("TypeScript narrowing", () => {
		const customType = isly.typeFromIs("test", specificIsFunction)
		const isNarrowingWorking: boolean | string | any = "garbage" as any
		if (customType.is(isNarrowingWorking)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const myCustom: Specific = isNarrowingWorking
		}
	})
	it("isly.typeFromIs(Specific)", () => {
		const customType = isly.typeFromIs("myName", specificIsFunction)
		expect(customType.is("Specific")).toEqual(true)
		expect(customType.is(13.37)).toEqual(false)
		expect(customType.flaw({})).toEqual({ type: "myName" })
	})
	it("isly.typeFromIs(Specific[])", () => {
		const customType = isly.array(isly.typeFromIs("myName", specificIsFunction))
		expect(customType.is([])).toEqual(true)
		expect(customType.is(["Specific", "Specific"])).toEqual(true)

		expect(customType.is(["Specific", 0, "Specific"])).toEqual(false)
		expect(customType.is("Specific")).toEqual(false)
		expect(customType.is(13.37)).toEqual(false)
		expect(customType.flaw({})).toEqual({ type: "myName[]" })
	})
})
