import { isly } from "../index"

describe("isly lazy", () => {
	// compile error if not working
	it("type narrowing", () => {
		const value: boolean | string | any = true as any
		if (isly.lazy<string>(() => isly.string(), "string").is(value)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const data: string = value
		}
	})
	it("generic", () => {
		const type = isly.lazy(() => isly.string(), "string")
		expect(type.is("42")).toBe(true)
		expect(type.flawed(42)).toEqual({ name: "string" })
	})
	it("recursive", () => {
		const values: Test.Data[] = ["test", ["a", "b", "c", ["d", ["e"]]]]
		const type = Test.Data.type.array()
		expect(type.name).toBe("Test.Data[]")
		expect(type.is(values)).toBe(true)
		expect(type.flawed(values)).toBe(false)
		expect(type.definition).toMatchInlineSnapshot(`
			{
			  "base": {
			    "class": "lazy",
			    "name": "Test.Data",
			  },
			  "class": "array",
			  "name": "Test.Data[]",
			}
		`)
		expect(type.flawed(["test", ["a", "b", "c", [2, ["e"]]]])).toEqual({
			flaws: [{ index: 1, name: "Test.Data" }],
			name: "Test.Data[]",
		})
	})
	it("recursive with manual definition", () => {
		const data: Data = { aaa: ["bbb"], cc: { d: "gg" } }
		expect(Data.type.is(data)).toEqual(true)
		expect(Data.type.name).toEqual("smoothly.Data")
		expect(Data.type.description).toEqual("Data emitted by events in smoothly")
		expect(Data.type.definition).toMatchInlineSnapshot(`
			{
			  "class": "record",
			  "description": "Data emitted by events in smoothly",
			  "key": {
			    "class": "string",
			    "name": "name",
			  },
			  "name": "smoothly.Data",
			  "value": {
			    "base": [
			      {
			        "class": "record",
			        "key": {
			          "class": "string",
			          "name": "name",
			        },
			        "name": "Data",
			        "value": {
			          "base": [
			            {
			              "class": "string",
			              "name": "string",
			            },
			            {
			              "class": "number",
			              "name": "number",
			            },
			            {
			              "class": "boolean",
			              "name": "boolean",
			            },
			            {
			              "class": "instance",
			              "name": "Blob",
			            },
			            {
			              "class": "undefined",
			              "name": "undefined",
			            },
			          ],
			          "class": "union",
			          "name": "(string | number | boolean | Blob | undefined)",
			        },
			      },
			      {
			        "base": [
			          {
			            "class": "string",
			            "name": "string",
			          },
			          {
			            "class": "number",
			            "name": "number",
			          },
			          {
			            "class": "boolean",
			            "name": "boolean",
			          },
			          {
			            "class": "instance",
			            "name": "Blob",
			          },
			          {
			            "class": "undefined",
			            "name": "undefined",
			          },
			        ],
			        "class": "union",
			        "name": "(string | number | boolean | Blob | undefined)",
			      },
			      {
			        "base": {
			          "class": "record",
			          "key": {
			            "class": "string",
			            "name": "name",
			          },
			          "name": "Data",
			          "value": {
			            "base": [
			              {
			                "class": "string",
			                "name": "string",
			              },
			              {
			                "class": "number",
			                "name": "number",
			              },
			              {
			                "class": "boolean",
			                "name": "boolean",
			              },
			              {
			                "class": "instance",
			                "name": "Blob",
			              },
			              {
			                "class": "undefined",
			                "name": "undefined",
			              },
			            ],
			            "class": "union",
			            "name": "(string | number | boolean | Blob | undefined)",
			          },
			        },
			        "class": "array",
			        "name": "data[]",
			      },
			      {
			        "base": {
			          "base": [
			            {
			              "class": "string",
			              "name": "string",
			            },
			            {
			              "class": "number",
			              "name": "number",
			            },
			            {
			              "class": "boolean",
			              "name": "boolean",
			            },
			            {
			              "class": "instance",
			              "name": "Blob",
			            },
			            {
			              "class": "undefined",
			              "name": "undefined",
			            },
			          ],
			          "class": "union",
			          "name": "(string | number | boolean | Blob | undefined)",
			        },
			        "class": "array",
			        "name": "(string | number | boolean | Blob | undefined)[]",
			      },
			    ],
			    "class": "union",
			    "name": "(data | (string | number | boolean | Blob | undefined) | data[] | (string | number | boolean | Blob | undefined)[])",
			  },
			}
		`)
	})
})
export namespace Test {
	export type Data = Array | string
	export namespace Data {
		export const type: isly.Lazy<Data> = isly.lazy(
			() => isly.union<Data>(Array.type, isly.string()).rename("Test.Data"),
			"Test.Data"
		)
		export const { is, flawed } = type.bind()
	}
	export type Array = Data[]
	export namespace Array {
		export const type = isly.array<Data>(Data.type).rename("Test.Array")
		export const { is, flawed } = type.bind()
	}
}
type Value = string | number | boolean | Blob | undefined
export type Data = { [name: string]: Data | Data[] | Value | Value[] }
export namespace Data {
	export const valueType = isly.union<Value, string, number, boolean, Blob, undefined>(
		isly.string(),
		isly.number(),
		isly.boolean(),
		isly.instance(Blob, "Blob"),
		isly.undefined()
	)
	const dataDefinition: isly.Definition = {
		class: "record",
		key: { class: "string", name: "name" },
		name: "Data",
		value: valueType.definition,
	}
	const lazyDataType = isly.lazy<Data>(() => type, "data", dataDefinition) //.rename("Data")
	export const type: isly.Record<Data> = isly
		.record<Data>(
			isly.string().rename("name"),
			isly.union(lazyDataType, valueType, lazyDataType.array(), valueType.array())
		)
		.rename("smoothly.Data")
		.describe("Data emitted by events in smoothly")
}
