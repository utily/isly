import { isly } from "../index"

describe("isly lazy", () => {
	// compile error if not working
	it("type narrowing", () => {
		const value: boolean | string | any = true as any
		if (isly.lazy(() => isly.string()).is(value)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const data: string = value
		}
	})
	it("generic", () => {
		const type = isly.lazy(() => isly.string())
		expect(type.is("42")).toBe(true)
		expect(type.flawed(42)).toEqual({ name: "string" })
	})
	it("recursive", () => {
		const values: Test.Data[] = ["test", ["a", "b", "c", ["d", ["e"]]]]
		const type = Test.Data.type.array()
		expect(type.name).toBe("Test.Data[]")
		expect(type.is(values)).toBe(true)
		expect(type.flawed(values)).toBe(false)
	})
})

export namespace Test {
	export type Data = Array | string
	export namespace Data {
		export const type: isly.Type<Data> = isly.lazy(() =>
			isly.union<Data>(Array.type, isly.string()).rename("Test.Data")
		)
	}
	export type Array = Data[]
	export namespace Array {
		export const type = isly.array<Data>(Data.type).rename("Test.Array")
	}
}
