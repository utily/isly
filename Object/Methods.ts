import type { Object } from "./"
import { Properties } from "./Properties"

export interface Methods<T> {
	extend<R extends T & object>(properties: Properties<Omit<R, keyof T>>): Object<R>
	omit<K extends keyof T>(omits: readonly K[]): Object<Omit<T, K>>
	pick<K extends keyof T>(picks: readonly K[]): Object<Pick<T, K>>
}
export namespace Methods {}
