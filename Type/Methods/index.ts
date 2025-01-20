import type { Type } from ".."
import { Data } from "../Data"
import { Decorator as MethodsDecorator } from "./Decorator"
import { Decorators as MethodsDecorators } from "./Decorators"

export interface Methods<T = any> {
	optional: () => Type<T | undefined>
	readonly: () => Type<Readonly<T>>
	array: () => Type<Array<T>>
}
export namespace Methods {
	export import Decorator = MethodsDecorator
	export import Decorators = MethodsDecorators
	const decorators: Partial<Decorators> = {}
	export function register<Method extends keyof Methods>(method: Method, decorator: Decorator<Method>): void {
		decorators[method] = decorator
	}
	export function decorate<T = any, D extends Data = Data>(type: D): D & Methods<T> {
		return decorators.optional!(decorators.readonly!(decorators.array!(type)))
	}
}
