import { Type } from "./Type"

// TODO: Use `const` with Typescript 5
// https://devblogs.microsoft.com/typescript/announcing-typescript-5-0-beta/#const-type-parameters
/**
 * Then using RegExp, don't use the /g-flag. (It makes .test() statefull)
 * @param condition
 */
export function string<T extends string>(condition?: T): Type<T>
export function string<T extends string>(condition?: readonly T[] | Record<T, any> | RegExp): Type<T>
export function string<T extends string>(condition?: readonly T[] | Record<T, any> | RegExp | string): Type<T> {
	return new IslyString<T>(condition)
}
export class IslyString<T extends string = string> extends Type<T> {
	readonly class = "string"
	protected conditionObject: Record<T, any> | RegExp | true | undefined
	constructor(readonly stringCondition?: readonly T[] | Record<T, any> | RegExp | string) {
		super(typeof stringCondition == "string" ? `"${stringCondition}"` : "string", () => {
			const conditionObject = this.getConditionObject()
			return conditionObject instanceof RegExp
				? `/${conditionObject.source}/${conditionObject.flags}`
				: globalThis.Object.keys(conditionObject)
						.map(key => `"${key}"`)
						.join(" | ")
		})
	}
	is = (value: T | any): value is T => {
		const conditionObject = this.getConditionObject()
		return (
			typeof value == "string" &&
			(conditionObject instanceof RegExp
				? conditionObject.test(value)
				: typeof conditionObject == "object"
				? value in conditionObject //TODO, avoid "hasOwnProperty toString etc."
				: conditionObject)
		)
	}
	protected getConditionObject(): NonNullable<IslyString<T>["conditionObject"]> {
		return (this.conditionObject ??= Array.isArray(this.stringCondition)
			? this.stringCondition.reduce((result, current) => {
					result[current] = true
					return result
			  }, globalThis.Object.create(null))
			: typeof this.stringCondition == "string"
			? { [this.stringCondition]: true }
			: typeof this.stringCondition == "object" // Record or RegExp!
			? this.stringCondition
			: true)
	}
}
