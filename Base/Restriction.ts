export type Restriction<V = any> =
	| [verify: (value: V) => boolean, condition: string]
	| [verify: (value: V) => boolean, condition: string, name: string]
	| [verify: (value: V) => boolean, condition: string, name: string, description: string]

export namespace Restriction {
	export function is(value: Restriction | any): value is Restriction {
		return (
			value.length > 1 &&
			value.length < 5 &&
			typeof value[0] == "function" &&
			typeof value[1] == "string" &&
			(value.length == 2 || (typeof value[2] == "string" && (value.length == 3 || typeof value[3] == "string")))
		)
	}
}
