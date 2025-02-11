import { Base } from "../Base"

export type Restriction<V extends boolean = boolean> = [value: V, name?: string]
export namespace Restriction {
	export function convert<V extends boolean = boolean>(restriction: Restriction<V>): Base.Restriction<V> {
		return [value => value == restriction[0], `value: ${restriction[0]}`, restriction[1] ?? restriction[0].toString()]
	}
}
