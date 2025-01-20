import type { Data } from "../Data"
import type { Methods } from "."

export type Decorator<Method extends keyof Methods, T = any> = (data: Data & T) => Data & T & Pick<Methods, Method>
export namespace Decorator {}
