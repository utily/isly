import { IslyAny } from "../any"
import { IslyBoolean } from "../boolean"
import { IslyFromIs } from "../fromIs"
import { IslyFunction } from "../function"
import { IslyIntersection } from "../intersection"
import { IslyLazy } from "../lazy"
import { IslyNamed } from "../named"
import { IslyNumber } from "../number"
import { IslyObject, object } from "../object"
import { IslyRecord } from "../record"
import { IslyString } from "../string"
import { IslyTuple } from "../tuple"
import { IslyArray, IslyOptional, IslyReadonly, Type } from "../Type"
import { IslyUndefined } from "../undefined"
import { IslyUnion } from "../union"
import { IslyUnknown } from "../unknown"

export abstract class Transformer<T> {
	transform(type: Transformer.Types, options?: Transformer.Options): T | undefined {
		let result: T | undefined
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
					result = this.onIntersection(type, type.types, options)
					break
				case "lazy":
					result = this.onLazy(type, type.backend, options)
					break
				case "named":
					result = this.onNamed(type, type.backend, options)
					break
				case "number":
					result = this.onNumber(type, options)
					break
				case "object":
					result = this.onObject(type, type.getProperties(), options)
					break
				case "record":
					result = this.onRecord(type, type.keyType, type.valueType, options)
					break
				case "string":
					result = this.onString(type, options)
					break
				case "tuple":
					result = this.onTuple(type, type.items, options)
					break
				case "array":
					result = this.onArray(type, type.itemType, options)
					break
				case "optional":
					result = this.onOptional(type, type.backend, { ...options, optional: true })
					break
				case "readonly":
					result = this.onReadonly(type, type.backend, { ...options, readonly: true })
					break
				case "undefined":
					result = this.onUndefined(type, options)
					break
				case "union":
					result = this.onUnion(type, type.types, options)
					break
				case "unknown":
					result = this.onUnknown(type, options)
					break
				default:
					break
			}
		return result
	}
	protected onAny(type: IslyAny, options?: Transformer.Options): T | undefined {
		return undefined
	}
	protected onBoolean(type: IslyBoolean, options?: Transformer.Options): T | undefined {
		return undefined
	}
	protected onFromIs(type: IslyFromIs, options?: Transformer.Options): T | undefined {
		return undefined
	}
	protected onFunction(type: IslyFunction, options?: Transformer.Options): T | undefined {
		return undefined
	}
	protected onIntersection(
		type: IslyIntersection,
		types: Type<unknown>[],
		options?: Transformer.Options
	): T | undefined {
		return undefined
	}
	protected onLazy(type: IslyLazy, backend: Type<unknown>, options?: Transformer.Options): T | undefined {
		return undefined
	}
	protected onNamed(type: IslyNamed, backend: Type<unknown>, options?: Transformer.Options): T | undefined {
		return undefined
	}
	protected onNumber(type: IslyNumber, options?: Transformer.Options): T | undefined {
		return undefined
	}
	protected onObject(
		type: IslyObject,
		properties: object.Properties<any, object>,
		options?: Transformer.Options
	): T | undefined {
		return undefined
	}
	protected onRecord(
		type: IslyRecord,
		key: Type<string | number>,
		value: Type,
		options?: Transformer.Options
	): T | undefined {
		return undefined
	}
	protected onString(type: IslyString, options?: Transformer.Options): T | undefined {
		return undefined
	}
	protected onTuple(type: IslyTuple, items: Type[], options?: Transformer.Options): T | undefined {
		return undefined
	}
	protected onArray(type: IslyArray, itemType: Type, options?: Transformer.Options): T | undefined {
		return undefined
	}
	protected onOptional(type: IslyOptional, backend: Type, options?: Transformer.Options): T | undefined {
		return
	}
	protected onReadonly(type: IslyReadonly, backend: Type, options?: Transformer.Options): T | undefined {
		return undefined
	}
	protected onUndefined(type: IslyUndefined, options?: Transformer.Options): T | undefined {
		return undefined
	}
	protected onUnion(type: IslyUnion, types: Type[], options?: Transformer.Options): T | undefined {
		return undefined
	}
	protected onUnknown(type: IslyUnknown, options?: Transformer.Options): T | undefined {
		return undefined
	}
}
export namespace Transformer {
	export type Options = {
		readonly?: boolean
		optional?: boolean
	}
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
		| Type
}
