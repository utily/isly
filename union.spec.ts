import "jest"
import * as isly from "./index"

describe("isly.union", () => {
	it("TypeScript narrowing", () => {
		type TestUnion = string | number
		const testTupleType = isly.union<TestUnion>(isly.string(), isly.number())
		// Test TypeScript Narrowing (compile error if not working)
		const isNarrowingWorking: boolean | string | any = "garbage" as any
		if (testTupleType.is(isNarrowingWorking)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const myTestTuple: TestUnion = isNarrowingWorking
		}
	})
	it("union", () => {
		type Test = string | number
		const unionType = isly.union<Test>(isly.number(), isly.string())
		// const is = type.is.bind(type)
		expect(unionType.is(13.37)).toEqual(true)
		// const flaw = type.flaw.bind(type)
		expect(unionType.flaw({})).toEqual({
			type: "number | string",
			flaws: [
				{
					type: "number",
				},
				{
					type: "string",
				},
			],
		})
	})
})
