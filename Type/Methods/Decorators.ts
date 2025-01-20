import type { Methods } from "."
import type { Decorator } from "./Decorator"

export type Decorators = { [Method in keyof Methods]: Decorator<Method> }
export namespace Decorators {}
