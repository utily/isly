import type { Definition } from "../Definition"
import type { Methods } from "."

export type Method<Method extends keyof Methods, T = any> = (
	data: Definition & T
) => Definition & T & Pick<Methods, Method>
export namespace Method {}
