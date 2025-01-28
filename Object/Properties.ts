import { Base } from "../Base"

export type Properties<T extends object> = {
	[P in keyof T]: Base<T[P]>
}
export namespace Properties {}
