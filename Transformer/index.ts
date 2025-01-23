import { Class } from "../Class"
import { Types } from "../Types"

export class Transformer<T extends Record<Class, any>> {
	private constructor(private configuration: Transformer.Configuration<T>) {}
	transform(type: Types[Class]): T[Class] | undefined {
		return this.configuration[type.class]?.(type)
	}
	static create<T extends Record<Class, any>>(configuration: Transformer.Configuration<T>) {
		return new Transformer(configuration)
	}
}
export namespace Transformer {
	export type Configuration<T extends Record<Class, any>> = { [K in Class]?: (type: Types[K]) => T[K] }
}
