import { isly } from "./index"

describe("Transformer", () => {
	it("transform 1", () => {
		interface TestObject {
			amount: number
			currency: string
			approved?: boolean
		}
		const testObjectType = isly.object<TestObject>({
			amount: isly.number(),
			currency: isly.string(["SEK", "EUR"]),
			approved: isly.boolean().optional(),
		})
		const test = new Test()
		expect(test.transform(testObjectType)).toEqual({
			condition: undefined,
			name: "object node",
			nested: {
				amount: { condition: undefined, name: "number node" },
				approved: { condition: undefined, name: "boolean node", optional: true },
				currency: { condition: '"SEK" | "EUR"', name: "string node" },
			},
		})
	})
	it("transform 2", () => {
		interface TestObject {
			amount: number
			currency: string
			approved: boolean[]
		}
		const testObjectType = isly
			.object<TestObject>({
				amount: isly.number(),
				currency: isly.string(["SEK", "EUR"]),
				approved: isly.boolean().array(),
			})
			.optional()
			.readonly()
		const test = new Test()
		expect(test.transform(testObjectType)).toEqual({
			condition: undefined,
			name: "object node",
			nested: {
				amount: { condition: undefined, name: "number node", optional: true, readonly: true },
				approved: {
					condition: undefined,
					name: "array node",
					nested: { values: { condition: undefined, name: "boolean node", optional: true, readonly: true } },
					optional: true,
					readonly: true,
				},
				currency: { condition: '"SEK" | "EUR"', name: "string node", optional: true, readonly: true },
			},
			optional: true,
			readonly: true,
		})
	})
})
type Node = { name: string; condition?: string; nested?: Record<string, Node | undefined> } & isly.Transformer.Options
export class Test extends isly.Transformer<Node> {
	constructor() {
		super()
	}
	protected onBoolean(type: isly.Type, options?: isly.Transformer.Options): Node | undefined {
		return { name: "boolean node", condition: type.condition, ...options }
	}
	protected onNumber(type: isly.Type, options?: isly.Transformer.Options): Node {
		return { name: "number node", condition: type.condition, ...options }
	}
	protected onString(type: isly.Type, options?: isly.Transformer.Options): Node {
		return { name: "string node", condition: type.condition, ...options }
	}
	protected onObject(type: isly.Type, properties: Record<string, isly.Type>, options?: isly.Transformer.Options): Node {
		return {
			name: "object node",
			condition: type.condition,
			nested: Object.entries(properties).reduce(
				(r, [key, value]) => ({ ...r, [key]: this.transform(value, options) }),
				{}
			),
			...options,
		}
	}
	protected onArray(type: isly.Type, items: isly.Type, options?: isly.Transformer.Options): Node | undefined {
		return {
			name: "array node",
			condition: type.condition,
			...options,
			nested: { values: this.transform(items, options) },
		}
	}
	protected onOptional(type: isly.Type, backend: isly.Type, options?: isly.Transformer.Options): Node | undefined {
		return this.transform(backend, options)
	}
	protected onReadonly(type: isly.Type, backend: isly.Type, options?: isly.Transformer.Options): Node | undefined {
		return this.transform(backend, options)
	}
}
