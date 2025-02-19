import { isly } from "../index"

describe("isly.Definition.Transformer", () => {
	it("transform 1", () => {
		interface TestObject {
			amount: number
			currency: string
			approved?: boolean
		}
		const testObjectType = isly.object<TestObject>({
			amount: isly.number(),
			currency: isly.string("value", ["SEK", "EUR"]),
			approved: isly.boolean().optional(),
		})
		expect(transformer.transform(testObjectType.definition)).toEqual({
			name: "object node",
			nested: {
				amount: { condition: undefined, name: "number node" },
				approved: { condition: undefined, name: "boolean node" },
				currency: { condition: ["value: ['SEK', 'EUR']"], name: "string node" },
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
				currency: isly.string("value", ["SEK", "EUR"]),
				approved: isly.boolean().array(),
			})
			.optional()
			.readonly()
		expect(transformer.transform(testObjectType.definition)).toEqual({
			name: "object node",
			nested: {
				amount: { condition: undefined, name: "number node" },
				approved: {
					condition: undefined,
					name: "array node",
					nested: { values: { condition: undefined, name: "boolean node" } },
				},
				currency: { condition: ["value: ['SEK', 'EUR']"], name: "string node" },
			},
		})
	})
})
type Node = { name: string; condition?: string[]; nested?: Record<string, Node | undefined> }
const transformer = isly.Definition.Transformer.create({
	boolean: (type: isly.Boolean.Definition): Node => ({ name: "boolean node", condition: type.condition }),
	number: (type: isly.Number.Definition): Node => ({ name: "number node", condition: type.condition }),
	string: (type: isly.String.Definition): Node => ({ name: "string node", condition: type.condition }),
	object: (type: isly.Object.Definition, transformer): Node => ({
		name: "object node",
		condition: type.condition,
		nested: Object.fromEntries(
			Object.entries(type.properties).map(([key, value]) => [key, transformer.transform(value)])
		),
	}),
	array: (type: isly.Array.Definition, transformer): Node => ({
		name: "array node",
		condition: type.condition,
		nested: { values: transformer.transform(type.base) },
	}),
	optional: (type: isly.Optional.Definition, transformer): Node => transformer.transform(type.base),
	readonly: (type: isly.Readonly.Definition, transformer): Node => transformer.transform(type.base),
})
