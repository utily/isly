import "jest"
import { isly } from "./index"

describe("isly.intersection", () => {
	// TypeScript compile error if not working
	it("TypeScript narrowing", () => {
		type A = { a?: number; shared: string }
		type B = { b?: number; shared: string }

		type TestIntersection = A & B
		// With generic provided
		{
			const testIntersectionType = isly.intersection<TestIntersection, A, B>(
				isly.object<A>({
					a: isly.number().optional(),
					shared: isly.string(),
				}),
				isly.object<B>({
					b: isly.number().optional(),
					shared: isly.string(),
				})
			)
			const isNarrowingWorking: boolean | string | any = "garbage" as any
			if (testIntersectionType.is(isNarrowingWorking)) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const myTestTuple: TestIntersection = isNarrowingWorking
			}
		}
		// without generic provided
		{
			const testIntersectionType = isly.intersection(
				isly.object<A>({
					a: isly.number().optional(),
					shared: isly.string(),
				}),
				isly.object<B>({
					b: isly.number().optional(),
					shared: isly.string(),
				})
			)
			const isNarrowingWorking: boolean | string | any = "garbage" as any
			if (testIntersectionType.is(isNarrowingWorking)) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const myTestTuple: TestIntersection = isNarrowingWorking
			}
		}

		type C = { c?: number; shared: string }
		type TestIntersectionTriple = A & B & C
		// With triple generic provided
		{
			const testIntersectionType = isly.intersection<TestIntersectionTriple, A, B, C>(
				isly.object<A>({
					a: isly.number().optional(),
					shared: isly.string(),
				}),
				isly.object<B>({
					b: isly.number().optional(),
					shared: isly.string(),
				}),
				isly.object<C>({
					c: isly.number().optional(),
					shared: isly.string(),
				})
			)
			const isNarrowingWorking: boolean | string | any = "garbage" as any
			if (testIntersectionType.is(isNarrowingWorking)) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const myTestTuple: TestIntersectionTriple = isNarrowingWorking
			}
		}
	})
	it("A & B", () => {
		type A = { a?: number; shared: string }
		type B = { b?: number; shared: string }
		const intersection = isly.intersection(
			isly.object<A>({
				a: isly.number().optional(),
				shared: isly.string(),
			}),
			isly.object<B>({
				b: isly.number().optional(),
				shared: isly.string(),
			})
		)
		expect(intersection.is({ shared: "shared string" })).toBe(true)
		expect(intersection.is({ shared: "shared string", a: 12 })).toBe(true)
		expect(intersection.name).toEqual(
			'{"a":"number | undefined","shared":"string"} & {"b":"number | undefined","shared":"string"}'
		)
		expect(intersection.is({ a: 42 })).toBe(false)
		expect(intersection.flaw({ a: 42, b: 43 })).toBeTruthy()
	})
	it("intersection.get", () => {
		type Foo = {
			foo: "foo"
			nesting: {
				foo: "foo"
				array: number[]
			}
			array: { b: string }[]
		}
		const fooType = isly.object<Foo>({
			foo: isly.string("foo"),
			nesting: isly.object({
				foo: isly.string("foo"),
				array: isly.number().array(),
			}),
			array: isly.array(isly.object({ b: isly.string() })),
		})
		type Bar = {
			bar: "bar"
			nesting: {
				bar: "bar"
				array: number[]
			}
			array: { test: string }[]
		}
		const barType = isly.object<Bar>({
			bar: isly.string("bar"),
			nesting: isly.object({
				bar: isly.string("bar"),
				array: isly.number().array(),
			}),
			array: isly.array(isly.object({ test: isly.string() })),
		})
		type Intersection = Foo & Bar
		const intersectionType = isly.intersection<Intersection, Foo, Bar>(fooType, barType)
		const intersection: Intersection = {
			foo: "foo",
			bar: "bar",
			nesting: {
				foo: "foo",
				bar: "bar",
				array: [222],
			},
			array: [{ test: "a", b: "b" }],
		}
		expect(intersectionType.get({ ...intersection, extra: "world" })).toEqual(intersection)
	})
	it("intersection<number>.get", () => {
		const positiveIntegerType = isly.intersection(isly.number("positive"), isly.number("integer"))

		expect(positiveIntegerType.get(1)).toBe(1)
		expect(positiveIntegerType.get(100)).toBe(100)

		expect(positiveIntegerType.get(1.1)).toBeUndefined()
		expect(positiveIntegerType.get(-1)).toBeUndefined()
		expect(positiveIntegerType.get(0)).toBeUndefined()
		expect(positiveIntegerType.get(NaN)).toBeUndefined()
		expect(positiveIntegerType.get(Infinity)).toBeUndefined()
	})
})
