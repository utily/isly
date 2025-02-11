import { Class } from "../Class"
import { Type } from "../Type"

export class Transformer<R extends Record<Class, any>> {
	private constructor(private configuration: Transformer.Configuration<R>) {}
	transform<T extends Type>(type: T): R[T["class"]] | undefined {
		return this.configuration[type.class]?.(type as any, this) // TODO: Fix this any
	}
	static create<R extends Record<Class, any>>(configuration: Transformer.Configuration<R>) {
		return new Transformer(configuration)
	}
}
export namespace Transformer {
	export type Configuration<R extends Record<Class, any>> = Partial<
		{ [K in Class]: (type: Type.FromClass[K], transformer: Transformer<R>) => R[K] }
	>
}
