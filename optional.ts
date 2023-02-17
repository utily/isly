import { Flaw } from "./Flaw"
import { Type } from "./Type"

class IslyOptional<T> extends Type.AbstractType<T | undefined> {
	constructor(protected readonly backend: Type<T>) {
		super(() => backend.name + " | undefined", backend.condition)
	}
	is = (value => value == undefined || this.backend.is(value)) as Type.IsFunction<T>
	protected createFlaw(value: any): Omit<Flaw, "isFlaw" | "type" | "condition"> {
		return this.createFlawFromType(this.backend, value)
	}
}

export function optional<T>(backend: Type<T>): Type<T | undefined> {
	return new IslyOptional<T>(backend)
}
