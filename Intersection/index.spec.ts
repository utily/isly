import { isly } from "../index"

describe("isly.intersection", () => {
	// compile error if not working
	it("type narrowing", () => {
		type A = { a?: number; shared: string }
		type B = { b?: number; shared: string }

		type AB = A & B
		// With generic provided
		{
			const type = isly.intersection<AB, A, B>(
				isly.object<A>({
					a: isly.number().optional(),
					shared: isly.string(),
				}),
				isly.object<B>({
					b: isly.number().optional(),
					shared: isly.string(),
				})
			)
			const value: boolean | string | any = "garbage" as any
			if (type.is(value)) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const data: AB = value
			}
		}
		// without generic provided
		{
			const type = isly.intersection(
				isly.object<A>({
					a: isly.number().optional(),
					shared: isly.string(),
				}),
				isly.object<B>({
					b: isly.number().optional(),
					shared: isly.string(),
				})
			)
			const value: boolean | string | any = "garbage" as any
			if (type.is(value)) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const data: AB = value
			}
		}
		type C = { c?: number; shared: string }
		type Abc = A & B & C
		// With triple generic provided
		{
			const type = isly.intersection<Abc, A, B, C>(
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
			const value: boolean | string | any = "garbage" as any
			if (type.is(value)) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const data: Abc = value
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
			"{ a: number | undefined, shared: string } & { b: number | undefined, shared: string }"
		)
		expect(intersection.is({ a: 42 })).toBe(false)
		expect(intersection.flawed({ a: 42, b: 43 })).toBeTruthy()
	})
	it("prune Alpha & Beta", () => {
		type Alpha = {
			a: number
			b: string[]
		}
		const alpha = isly.object<Alpha>({ a: isly.number(), b: isly.string().array() })
		type Beta = {
			c: string
		}
		const beta = isly.object<Beta>({ c: isly.string() })
		type AlphaBeta = Alpha & Beta
		const alphaBeta = isly.intersection(alpha, beta)
		const value = { a: 42, b: ["power"], c: "attraction" }
		expect(alphaBeta.is(value)).toBe(true)
	})
	it("prune Foo & Bar", () => {
		type Foo = {
			foo: "foo"
			nesting: {
				foo: "foo"
				array: number[]
			}
			array: { b: string }[]
		}
		const fooType = isly.object<Foo>({
			foo: isly.string("value", "foo"),
			nesting: isly.object({
				foo: isly.string("value", "foo"),
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
			bar: isly.string("value", "bar"),
			nesting: isly.object({
				bar: isly.string("value", "bar"),
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
		expect(intersectionType.prune({ ...intersection, extra: "world" })).toEqual(intersection)
	})
	it("intersection<number>.prune", () => {
		const type = isly.intersection(isly.number("positive"), isly.number("integer"))

		expect(type.prune(1)).toBe(1)
		expect(type.prune(100)).toBe(100)

		expect(type.prune(1.1)).toBeUndefined()
		expect(type.prune(-1)).toBeUndefined()
		expect(type.prune(0)).toBeUndefined()
		expect(type.prune(NaN)).toBeUndefined()
		expect(type.prune(Infinity)).toBeUndefined()
	})
	it("intersection name", () => {
		const type = isly.intersection(isly.object({ a: isly.string() }), isly.object({ b: isly.string() }, "B"))
		expect(type.name).toBe(`{ a: string } & B`)
	})
})
