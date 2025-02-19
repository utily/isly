import { creator } from "../creator"
import type { isly } from "../index"

export type Data<T = Record<string, never>> = boolean | string | number | null | undefined | Data.Object<T> | Data.Array
const typeData: isly.Lazy<Data> = creator.lazy(() =>
	creator
		.union<Data>(
			creator.boolean(),
			creator.string(),
			creator.number(),
			creator.null(),
			creator.undefined(),
			typeDataObject,
			typeDataArray
		)
		.rename("typedly.Json.Data")
)
const typeDataObject = creator.record<Data.Object>(creator.string(), typeData).rename("typedly.Json.Data.Object")
const typeDataArray = creator.array<Data>(typeData).rename("typedly.Json.Data.Array")

export namespace Data {
	export const { type, is, flawed } = typeData.bind()

	export type Object<T = Record<string, never>> = {
		[property in keyof T]: Data
	}
	export namespace Object {
		export const { type, is, flawed } = typeDataObject.bind()
	}
	export type Array = Data[]
	export namespace Array {
		export const { type, is, flawed } = typeDataArray.bind()
	}
}
