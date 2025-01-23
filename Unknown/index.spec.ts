import { isly } from "../index"

describe("isly.unknown", () => {
	it("TypeScript narrowing", () => {
		const unknown = isly("unknown")

		const narrowingUnknown = "garbage" as unknown
		if (unknown.is(narrowingUnknown)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const t: unknown = narrowingUnknown
		}
		const narrowingAny = "garbage" as any
		if (unknown.is(narrowingAny)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const t: unknown = narrowingAny
		}
	})
	it("generic", () => {
		const unknown = isly("unknown")
		expect(unknown.is("42")).toEqual(true)
		expect(unknown.is(null)).toEqual(false)
		expect(unknown.is(undefined)).toEqual(false)
		// expect(unknown.flaw(undefined)).toEqual({ type: "unknown" })
	})
	it("get", () => {
		const unknown = isly("unknown")
		expect(unknown.get(42)).toEqual(42)
	})
})
