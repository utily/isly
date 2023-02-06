import { Type } from "./Type"

export function named<T>(name: string, backend: Type<T>): Type<T> {
	return Type.create(
		name,
		(value => backend.is(value)) as Type.IsFunction<T>,
		(value => {
			const result = backend.flaw(value)
			return result ? { ...result, type: name } : undefined
		}) as Type.FlawFunction<T>
	)
}
