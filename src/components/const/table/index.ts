/**
 * @file table常量定义
 */

import { InjectionKey } from "vue";
import type { SortOptions } from "../../types/table";

export interface TableData {
  onTableSort: (sortOptions: SortOptions) => void;
}

export enum SortStatus {
  Desc = -1,
  Disable,
  Asc = 1,
}

export enum TableSort {
  Asc = "asc",
  Desc = "desc",
  Disable = "disable",
}

export const SORT_TYPE_NUMBER = {
  [TableSort.Asc]: SortStatus.Asc,
  [TableSort.Desc]: SortStatus.Desc,
  [TableSort.Disable]: SortStatus.Disable,
};
export const SORT_TYPE_LIST: TableSort[] = [
  TableSort.Disable,
  TableSort.Asc,
  TableSort.Desc,
];

export const TABLE_PROPS: InjectionKey<TableData> = Symbol("tableProps");
