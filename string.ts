import { Type } from "./Type"

export function string<T extends string>(condition?: readonly T[] | Record<T, any> | RegExp | string): Type<T> {
	let conditionObject: Record<T, any> | RegExp | true

	const name = "string"
	function createConditionObject(): typeof conditionObject {
		return Array.isArray(condition)
			? condition.reduce((result, current) => {
					result[current] = true
					return result
			  }, Object.create(null))
			: typeof condition == "string"
			? { [condition]: true }
			: typeof condition == "object" // Record or RegExp!
			? condition
			: true
	}

	function is(value: any | string): value is T {
		conditionObject ??= createConditionObject()
		return (
			typeof value == "string" &&
			(conditionObject instanceof RegExp
				? conditionObject.test(value)
				: typeof conditionObject == "object"
				? value in conditionObject //TODO, avoid "hasOwnProperty toString etc."
				: conditionObject)
		)
	}
	const flaw: Type.FlawFunction = value =>
		is(value)
			? undefined
			: {
					type: name,
					...(typeof (conditionObject ??= createConditionObject()) == "object"
						? {
								condition:
									conditionObject instanceof RegExp
										? `/${conditionObject.source}/${conditionObject.flags}`
										: Object.keys(conditionObject)
												.map(key => `"${key}"`)
												.join(" | "),
						  }
						: undefined),
			  }

	return Type.create(name, is, flaw)
}
