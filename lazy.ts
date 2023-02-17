import { Flaw } from "./Flaw"
import { Type } from "./Type"

class IslyLazy<T> extends Type.AbstractType<T> {
	protected type: Type<T>
	constructor(protected readonly factory: () => Type<T>, name?: string) {
		super(name ?? (() => (this.type ??= factory()).name), () => (this.type ??= factory()).condition)
	}
	is = (value => (this.type ??= this.factory()).is(value)) as Type.IsFunction<T>
	createFlaw(value: any): Omit<Flaw, "isFlaw" | "type" | "condition"> {
		return this.createFlawFromType((this.type ??= this.factory()), value)
	}
}

/**
 * Late evaluation of a type
 * Can be used for for recursive types.
 *
 * @param factory
 * @param name Provide a name, to avoid infinite loop if the type i recursive
 * @returns
 */
export function lazy<T>(factory: () => Type<T>, name?: string): Type<T> {
	return new IslyLazy<T>(factory, name)
}
