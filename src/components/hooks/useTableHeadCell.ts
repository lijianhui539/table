/**
 * @file 处理表头单元格逻辑
 */

import { TableHeadCellProps, SortOptions } from "../table/types";
import { ref, computed } from "vue";
import { SORT_TYPE_LIST, SortIconStatus } from "../table/const";
import PubSub from "pubsub-js";
import { Logger } from '@src/utils/logger';
const MODULE = 'table-head-cell'

export function useTableHeadCell(
  props: TableHeadCellProps,
  sortEmit: (val: SortOptions) => void
) {
  let { column } = props;
  let sortListIndex = ref(SortIconStatus.Disable);
  let fieldKey = ref("");
  let sortType = computed(() => {
    let resType = SORT_TYPE_LIST[sortListIndex.value];
    column.sort = resType;
    sortEmit({
      sortKey: fieldKey.value,
      sortType: resType,
    });
    return resType;
  });

  let onSort = (val: string) => {
    // 点击不同字段  sortListIndex 恢复Disable 排序恢复默认值
    if (val !== fieldKey.value) {
      sortListIndex.value = SortIconStatus.Disable;
    }

    fieldKey.value = val;
    let sortOptions = {
      fieldKey: fieldKey.value,
      sortType: sortType.value,
    }
    if (sortListIndex.value === SortIconStatus.Desc) {
      sortListIndex.value = SortIconStatus.Disable;
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
