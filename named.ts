import { Flaw } from "./Flaw"
import { Type } from "./Type"

class IslyNamed<T> extends Type<T> {
	constructor(name: string, protected readonly backend: Type<T>) {
		super(name, () => backend.condition)
	}
	is = (value => this.backend.is(value)) as Type.IsFunction<T>
	createFlaw(value: any): Omit<Flaw, "isFlaw" | "type" | "condition"> {
		return this.createFlawFromType(this.backend, value)
	}
	get: Type.GetFunction<T> = value => this.backend.get(value)
}

export function named<T>(name: string, backend: Type<T>): Type<T> {
	return new IslyNamed<T>(name, backend)
}
