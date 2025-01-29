import { Base } from "../Base"

export interface Definition extends Base.Definition {
	readonly base: Base.Definition[]
}
export namespace Definition {}
