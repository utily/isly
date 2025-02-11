import { Base } from "./Base"

export type BindResult<V = unknown, T extends Base<V> = Base<V>> = Omit<T, "bind"> & { type: T }
