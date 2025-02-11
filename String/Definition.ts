import { Base } from "../Base"

export interface Definition extends Base.Definition {
	readonly allowed?: readonly string[]
}
export namespace Definition {}
