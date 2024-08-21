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
			approved: boolean
		}
		const testObjectType = isly
			.object<TestObject>({
				amount: isly.number(),
				currency: isly.string(["SEK", "EUR"]),
				approved: isly.boolean(),
			})
			.optional()
			.readonly()
		const test = new Test()
		expect(test.transform(testObjectType)).toEqual({
			condition: undefined,
			name: "object node",
			nested: {
				amount: { condition: undefined, name: "number node", optional: true, readonly: true },
				approved: { condition: undefined, name: "boolean node", optional: true, readonly: true },
				currency: { condition: '"SEK" | "EUR"', name: "string node", optional: true, readonly: true },
			},
			optional: true,
			readonly: true,
		})
	})
})
type Node = { name: string; condition?: string; nested?: Record<string, Node> } & isly.Transformer.Options
export class Test extends isly.Transformer<Node> {
	constructor() {
		super()
	}
	protected onAny(type: isly.Transformer.IslyAny, options?: isly.Transformer.Options): Node | undefined {
		return undefined
	}
	protected onBoolean(type: isly.Transformer.IslyBoolean, options?: isly.Transformer.Options): Node | undefined {
		return { name: "boolean node", condition: type.condition, ...options }
	}
	protected onFromIs(type: isly.Transformer.IslyFromIs, options?: isly.Transformer.Options): Node | undefined {
		return undefined
	}
	protected onFunction(type: isly.Transformer.IslyFunction, options?: isly.Transformer.Options): Node | undefined {
		return undefined
	}
	protected onIntersection(
		type: isly.Transformer.IslyIntersection,
		options?: isly.Transformer.Options
	): Node | undefined {
		return undefined
	}
	protected onLazy(type: isly.Transformer.IslyLazy, options?: isly.Transformer.Options): Node | undefined {
		return undefined
	}
	protected onNamed(type: isly.Transformer.IslyNamed, options?: isly.Transformer.Options): Node | undefined {
		return undefined
	}
	protected onNumber(type: isly.Transformer.IslyNumber, options?: isly.Transformer.Options): Node {
		return { name: "number node", condition: type.condition, ...options }
	}
	protected onObject(type: isly.Transformer.IslyObject, options?: isly.Transformer.Options): Node {
		const properties = type.getProperties()
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
	protected onRecord(type: isly.Transformer.IslyRecord, options?: isly.Transformer.Options): Node | undefined {
		return undefined
	}
	protected onString(type: isly.Transformer.IslyString, options?: isly.Transformer.Options): Node {
		return { name: "string node", condition: type.condition, ...options }
	}
	protected onTuple(type: isly.Transformer.IslyTuple, options?: isly.Transformer.Options): Node | undefined {
		return undefined
	}
	protected onArray(type: isly.Transformer.IslyArray, options?: isly.Transformer.Options): Node | undefined {
		return undefined
	}
	protected onOptional(type: isly.Transformer.IslyOptional, options?: isly.Transformer.Options): Node | undefined {
		return this.transform(type.backend, options)
	}
	protected onReadonly(type: isly.Transformer.IslyReadonly, options?: isly.Transformer.Options): Node | undefined {
		return this.transform(type.backend, options)
	}
	protected onUndefined(type: isly.Transformer.IslyUndefined, options?: isly.Transformer.Options): Node | undefined {
		return undefined
	}
	protected onUnion(type: isly.Transformer.IslyUnion, options?: isly.Transformer.Options): Node | undefined {
		return undefined
	}
	protected onUnknown(type: isly.Transformer.IslyUnknown, options?: isly.Transformer.Options): Node | undefined {
		return undefined
	}
}
