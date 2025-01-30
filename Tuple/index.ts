import { Class } from "./Class"
import { Definition as TupleDefinition } from "./Definition"

export type Tuple<V extends any[] = unknown[]> = Omit<Class<V>, "constructor">

export namespace Tuple {
	export import Definition = TupleDefinition
}
