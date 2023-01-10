import { Flaw } from "./Flaw"
import { Type } from "./Type"

export function named<T>(name: string, backend: Type<T>): Type<T> {
	function is(value: any | T): value is T {
		return backend.is(value)
	}
	function flaw(value: any | T): true | Flaw {
		const result = backend.flaw(value)
		return (
			result == true || {
				...result,
				type: name,
			}
		)
	}

	return {
		name,
		is,
		flaw,
	}
}
