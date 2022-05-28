/**
 * @file 处理表头单元格逻辑
 */

import { TableHeadCellProps, SortOptions } from "../table/types";
import { ref, toRefs, watch } from "vue";
import { SORT_TYPE_LIST, SortIconStatus } from "../table/const";
import PubSub from "pubsub-js";


export function useTableHeadCell(
  props: TableHeadCellProps,
  sortEmit: (val: SortOptions) => void
) {
  let { column } = toRefs(props);
  let sortListIndex = ref(SortIconStatus.Disable);
  let fieldKey = ref("");
  let sortOptions: SortOptions = {
    fieldKey: '',
    sortType: ''
  }


  watch(() => { sortListIndex.value }, () => {
    sortOptions.fieldKey = fieldKey.value
    sortOptions.sortType = SORT_TYPE_LIST[sortListIndex.value]
    column.value.sort = SORT_TYPE_LIST[sortListIndex.value]
    sortEmit(sortOptions);
  }, {
    deep: true
  })

  let onSort = (val: string) => {
    // 点击不同字段  sortListIndex 恢复Disable 排序恢复默认值
    if (val !== fieldKey.value) {
      sortListIndex.value = SortIconStatus.Disable;
    }

    fieldKey.value = val;
    if (sortListIndex.value === SortIconStatus.Desc) {
      sortListIndex.value = SortIconStatus.Disable;
      PubSub.publish("table-head-sort", sortOptions);
      return;
    }
    sortListIndex.value++;
    PubSub.publish("table-head-sort", sortOptions);
  };
  return {
    onSort,
  };
}
