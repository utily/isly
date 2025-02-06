import { Class } from "./Class"
import { Creator as TupleCreator } from "./Creator"
import { Definition as TupleDefinition } from "./Definition"

export type Tuple<V extends any[] = unknown[]> = Omit<Class<V>, "constructor">

export namespace Tuple {
	export import Creator = TupleCreator
	export import Definition = TupleDefinition
}
