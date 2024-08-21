import { any } from "./any"
import { boolean } from "./boolean"
import { fromIs } from "./fromIs"
import { islyFunction } from "./function"
import { intersection } from "./intersection"
import { lazy } from "./lazy"
import { named } from "./named"
import { number } from "./number"
import { object } from "./object"
import { record } from "./record"
import { string } from "./string"
import { tuple } from "./tuple"
import { array, optional, readonly as islyReadonly, Type } from "./Type"
import { islyUndefined as undefined } from "./undefined"
import { union } from "./union"
import { unknown } from "./unknown"

export abstract class Transformer<T> {
	transform(type: Transformer.Types, options?: Transformer.Options): T | undefined {
		let result: T | undefined
		type instanceof array.Class && type.class
		if ("class" in type)
			switch (type.class) {
				case "any":
					result = this.onAny(type, options)
					break
				case "boolean":
					result = this.onBoolean(type, options)
					break
				case "fromIs":
					result = this.onFromIs(type, options)
					break
				case "function":
					result = this.onFunction(type, options)
					break
				case "intersection":
					result = this.onIntersection(type, options)
					break
				case "lazy":
					result = this.onLazy(type, options)
					break
				case "named":
					result = this.onNamed(type, options)
					break
				case "number":
					result = this.onNumber(type, options)
					break
				case "object":
					result = this.onObject(type, options)
					break
				case "record":
					result = this.onRecord(type, options)
					break
				case "string":
					result = this.onString(type, options)
					break
				case "tuple":
					result = this.onTuple(type, options)
					break
				case "array":
					result = this.onArray(type, options)
					break
				case "optional":
					result = this.onOptional(type, { ...options, optional: true })
					break
				case "readonly":
					result = this.onReadonly(type, { ...options, readonly: true })
					break
				case "undefined":
					result = this.onUndefined(type, options)
					break
				case "union":
					result = this.onUnion(type, options)
					break
				case "unknown":
					result = this.onUnknown(type, options)
					break
				default:
					break
			}
		return result
	}
	protected abstract onAny(type: Transformer.IslyAny, options?: Transformer.Options): T | undefined
	protected abstract onBoolean(type: Transformer.IslyBoolean, options?: Transformer.Options): T | undefined
	protected abstract onFromIs(type: Transformer.IslyFromIs, options?: Transformer.Options): T | undefined
	protected abstract onFunction(type: Transformer.IslyFunction, options?: Transformer.Options): T | undefined
	protected abstract onIntersection(type: Transformer.IslyIntersection, options?: Transformer.Options): T | undefined
	protected abstract onLazy(type: Transformer.IslyLazy, options?: Transformer.Options): T | undefined
	protected abstract onNamed(type: Transformer.IslyNamed, options?: Transformer.Options): T | undefined
	protected abstract onNumber(type: Transformer.IslyNumber, options?: Transformer.Options): T | undefined
	protected abstract onObject(type: Transformer.IslyObject, options?: Transformer.Options): T | undefined
	protected abstract onRecord(type: Transformer.IslyRecord, options?: Transformer.Options): T | undefined
	protected abstract onString(type: Transformer.IslyString, options?: Transformer.Options): T | undefined
	protected abstract onTuple(type: Transformer.IslyTuple, options?: Transformer.Options): T | undefined
	protected abstract onArray(type: Transformer.IslyArray, options?: Transformer.Options): T | undefined
	protected abstract onOptional(backend: Transformer.IslyOptional, options?: Transformer.Options): T | undefined
	protected abstract onReadonly(type: Transformer.IslyReadonly, options?: Transformer.Options): T | undefined
	protected abstract onUndefined(type: Transformer.IslyUndefined, options?: Transformer.Options): T | undefined
	protected abstract onUnion(type: Transformer.IslyUnion, options?: Transformer.Options): T | undefined
	protected abstract onUnknown(type: Transformer.IslyUnknown, options?: Transformer.Options): T | undefined
}
export namespace Transformer {
	export type Options = {
		readonly?: boolean
		optional?: boolean
	}
	export type IslyAny = any.Class
	export type IslyBoolean = boolean.Class
	export type IslyFromIs = fromIs.Class
	export type IslyFunction = islyFunction.Class
	export type IslyIntersection = intersection.Class
	export type IslyLazy = lazy.Class
	export type IslyNamed = named.Class
	export type IslyNumber = number.Class
	export type IslyObject = object.Class
	export type IslyRecord = record.Class
	export type IslyString = string.Class
	export type IslyTuple = tuple.Class
	export type IslyArray = array.Class
	export type IslyOptional = optional.Class
	export type IslyReadonly = islyReadonly.Class
	export type IslyUndefined = undefined.Class
	export type IslyUnion = union.Class
	export type IslyUnknown = unknown.Class
	export type Types =
		| IslyAny
		| IslyBoolean
		| IslyFromIs
		| IslyFunction
		| IslyIntersection
		| IslyLazy
		| IslyNamed
		| IslyNumber
		| IslyObject
		| IslyRecord
		| IslyString
		| IslyTuple
		| IslyArray
		| IslyOptional
		| IslyReadonly
		| IslyUndefined
		| IslyUnion
		| IslyUnknown
		| Type<any>
}
