/**
 * @file table常量定义
 */

import { InjectionKey, Ref } from "vue"
import type { TableProps, SortOptions } from "./types";

export interface TableData {
    currentPage: Ref<number>;
    props: TableProps,
    onTableSort: (sortOptions: SortOptions) => void
}

export enum SortIconStatus {
    Disable,
    Asc,
    Desc,
}

export enum TableSort {
    Asc = 'asc',
    Desc = 'desc',
    Disable = 'disable'
}
export const SORT_TYPE_LIST: TableSort[] = [TableSort.Disable, TableSort.Asc, TableSort.Desc]

export const TABLE_PROPS: InjectionKey<TableData> = Symbol('tableProps')