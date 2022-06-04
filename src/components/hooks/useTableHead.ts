/** 
  @file 处理表头逻辑
*/

import { Ref, computed } from "vue";
import type { ColumnType } from "../types/table";
import { TableSort } from "../const/table";

export function useTableHead(columns: Ref<ColumnType[]>) {
  let renderColumns = computed(() => {
    return columns.value.map((item) => {
      item.sort = TableSort.Disable;
      return item;
    });
  });

  return {
    renderColumns,
  };
}
