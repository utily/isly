import type { Base } from "../Base"
import type { Flaw as islyFlaw } from "../Flaw"

export interface Flaw extends Base.Flaw {
	flaws?: (islyFlaw & { index: number })[]
}
export namespace Flaw {}
