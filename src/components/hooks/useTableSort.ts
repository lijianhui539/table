/** 
  @file 处理表格排序
*/

import { Ref, ref, computed } from "vue";
import { TableSort, SORT_TYPE_NUMBER } from "../const/table";
import type { SortOptions } from "../types/table";
import { Logger } from "@src/utils/logger";
const MODULE = "table-sort";

export function useTableSort(
  dataSource: Ref<any[]>,
  currentPage: Ref<number>,
  pageSize: Ref<number>
) {
  let sortTypeNumber = SORT_TYPE_NUMBER[TableSort.Disable];
  let sortOptions = ref<SortOptions>({
    fieldKey: "",
    sortType: TableSort.Disable,
  });

  let renderList = computed(() => {
    sortTypeNumber = SORT_TYPE_NUMBER[sortOptions.value.sortType];
    let sortOutData = dataSource.value.slice().sort((firstEl, secondEl) => {
      return (
        (firstEl[sortOptions.value.fieldKey] -
          secondEl[sortOptions.value.fieldKey]) *
        sortTypeNumber
      );
    });

    return sortOutData.slice(
      (currentPage.value - 1) * pageSize.value,
      currentPage.value * pageSize.value
    );
  });

  let onTableSort = (resSortOption: SortOptions) => {
    sortOptions.value = resSortOption;
    currentPage.value = 1;
    Logger.trace(
      MODULE,
      `handle sort event sortOptions: ${JSON.stringify(resSortOption)}`
    );
  };
  return {
    onTableSort,
    renderList,
  };
}
