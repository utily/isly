export interface Verifier<T> {
	verify: (value: T) => boolean
	description: string
}
export namespace Verifier {}
