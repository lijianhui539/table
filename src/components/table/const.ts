import { InjectionKey, Ref } from "vue"
import { type TableProps } from "./types";

export interface TableData {
    current: Ref<number>;
    props: TableProps
}

export const TABLE_PROPS: InjectionKey<TableData> = Symbol('tableProps')