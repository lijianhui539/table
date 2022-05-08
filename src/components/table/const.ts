import { InjectionKey, Ref } from "vue"
import { type TableProps,ColumnType } from "./types";

export interface TableData {
    currentPage: Ref<number>;
    props: TableProps,
    item: ColumnType
}

export enum TableSort {
    Asc = 'asc',
    Desc = 'desc',
    Disable = 'disable'
}
export const SORT_TYPE_LIST: TableSort[] = [TableSort.Disable, TableSort.Asc, TableSort.Desc]

export const TABLE_PROPS: InjectionKey<TableData> = Symbol('tableProps')