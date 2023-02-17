import "jest"
import * as isly from "./index"

describe("isly.typeFromIs", () => {
	type Specific = "Specific"
	const specificIsFunction = ((value: any) => value == "Specific") as isly.Type.IsFunction<Specific>

	// TypeScript compile error if not working
	it("TypeScript narrowing, without generic", () => {
		const customType = isly.fromIs("test", specificIsFunction)
		const isNarrowingWorking: boolean | string | any = "garbage" as any
		if (customType.is(isNarrowingWorking)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const myCustom: Specific = isNarrowingWorking
		}
	})
	// TypeScript compile error if not working
	it("TypeScript narrowing, with generic", () => {
		const customType = isly.fromIs<Specific>("test", value => value == "Specific")
		const isNarrowingWorking: boolean | string | any = "garbage" as any
		if (customType.is(isNarrowingWorking)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const myCustom: Specific = isNarrowingWorking
		}
	})
	it("isly.typeFromIs(Specific)", () => {
		const customType = isly.fromIs("myName", specificIsFunction)
		expect(customType.is("Specific")).toEqual(true)
		expect(customType.is(13.37)).toEqual(false)
		expect(customType.flaw({})).toEqual({ type: "myName" })
	})
	it("isly.typeFromIs(Specific[])", () => {
		const customType = isly.array(isly.fromIs("myName", specificIsFunction))
		expect(customType.is([])).toEqual(true)
		expect(customType.is(["Specific", "Specific"])).toEqual(true)

		expect(customType.is(["Specific", 0, "Specific"])).toEqual(false)
		expect(customType.is("Specific")).toEqual(false)
		expect(customType.is(13.37)).toEqual(false)
		expect(customType.flaw({})).toEqual({ type: "myName[]" })
	})
	it("class", () => {
		class A {
			ab: 1
		}
		class B {
			ab: 1
		}
		const a = new A()
		const b = new B()

		const typeA = isly.fromIs<A>("A", (value => value instanceof A) as isly.Type.IsFunction<A>)

		const typeB = isly.fromIs<B>("B", (value => value instanceof B) as isly.Type.IsFunction<A>)

		expect(typeA.is(a)).toEqual(true)
		expect(typeA.is(b)).toEqual(false)

		expect(typeB.is(b)).toEqual(true)
		expect(typeB.is(a)).toEqual(false)

		expect(typeA.flaw(undefined)).toEqual({ type: "A" })
	})
})
