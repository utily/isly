import { Flaw } from "./Flaw"
import { Type } from "./Type"

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
export class IslyLazy<T = unknown> extends Type<T> {
	readonly class = "lazy"
	backend: Type<T>
	constructor(protected readonly factory: () => Type<T>, name?: string) {
		super(name ?? (() => (this.backend ??= factory()).name), () => (this.backend ??= factory()).condition)
	}
	is = (value: T | any): value is T => (this.backend ??= this.factory()).is(value)
	createFlaw(value: any): Omit<Flaw, "isFlaw" | "type" | "condition"> {
		return this.createFlawFromType((this.backend ??= this.factory()), value)
	}
	getBackend() {
		return this.backend
	}
	public get(value: any): T | undefined {
		return this.backend.get(value)
	}
}
