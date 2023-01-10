import { Type } from "./Type"

export function optional<T>(backend: Type<T>): Type<T | undefined> {
	const name = () => backend.name + " | undefined"
	const is = (value => value == undefined || backend.is(value)) as Type.IsFunction<T | undefined>

	return Type.create<T | undefined>(name, is, value => {
		const result = value == undefined || backend.flaw(value)
		return (
			result == true || {
				...result,
				type: name(),
			}
		)
	})
}
