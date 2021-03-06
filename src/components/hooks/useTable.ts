/** 
  @file 外层表格处理逻辑
*/

import { ref, computed, toRefs } from "vue";
import type { TableProps } from "../table/types";
import { TableSort } from "../table/const";
import { Logger } from '@src/utils/logger';
const MODULE = 'table'

export function useTable(props: TableProps) {
  let { columns } = toRefs(props)
  // 异常处理
  if (!Array.isArray(columns.value)) {
    Logger.error(MODULE, 'columns Expected Array');
    columns.value = []
  }
  let currentPage = ref(1);

  // 拿来数据先设置默认的排序规则
  let renderColumns = computed(() => {
    return columns.value.map((item) => {
      item.sort = TableSort.Disable;
      return item;
    });
  });

  let onPageChange = (pageNumber: number) => {
    currentPage.value = pageNumber;
  };

  return {
    currentPage,
    onPageChange,
    renderColumns,
  };
}
