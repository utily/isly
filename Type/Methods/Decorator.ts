import type { Definition } from "../Definition"
import type { Methods } from "."

export type Decorator<Method extends keyof Methods, T = any> = (data: Definition & T) => Definition & T & Pick<Methods, Method>
export namespace Decorator {}
