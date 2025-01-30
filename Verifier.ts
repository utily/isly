export interface Verifier<T> {
	condition: string
	verify: (value: T) => boolean
	allowed?: T[]
}
export namespace Verifier {}
