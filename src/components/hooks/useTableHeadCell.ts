/**
 * @file 处理表头单元格逻辑
 */

import { TableHeadCellProps, SortOptions } from "../table/types";
import { ref, ComputedRef, computed } from "vue";
import { TableSort, SORT_TYPE_LIST } from "../table/const";
import PubSub from "pubsub-js";
import { Logger } from '@src/utils/logger';
const MODULE = 'table-head-cell'

export function useTableHeadCell(
  props: TableHeadCellProps,
  sortEmit: (val: SortOptions) => void
) {
  let { column } = props;
  let sortListIndex = ref(0);
  let fieldKey = ref("");
  let sortType: ComputedRef<TableSort> = computed(() => {
    let resType = SORT_TYPE_LIST[sortListIndex.value];
    column.sort = resType;
    sortEmit({
      sortKey: fieldKey.value,
      sortType: resType,
    });
    return resType;
  });

  let onSort = (val: string) => {
    // 点击不同字段  sortListIndex 恢复0 排序恢复默认值
    if (val !== fieldKey.value) {
      sortListIndex.value = 0;
    }

    fieldKey.value = val;
    let sortOptions = {
      fieldKey: fieldKey.value,
      sortType: sortType.value,
    }
    if (sortListIndex.value === 2) {
      sortListIndex.value = 0;
      PubSub.publish("table-head-sort", sortOptions);
      Logger.trace(MODULE, `handle sort event sortOptions: ${JSON.stringify(sortOptions)}`)
      return;
    }
    sortListIndex.value++;
    PubSub.publish("table-head-sort", sortOptions);
    Logger.trace(MODULE, `handle sort event sortOptions: ${JSON.stringify(sortOptions)}`)
  };
  return {
    onSort,
    fieldKey,
    sortType,
  };
}
