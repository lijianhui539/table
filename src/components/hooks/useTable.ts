/** 
  @file 处理整个表格逻辑
*/

import { toRefs } from "vue";
import type { TableProps } from "../types/table";
import { useTableHead } from "./useTableHead";
import { useTableSort } from "./useTableSort";
import { usePagination } from "./usePagination";

export function useTableDataSource(props: TableProps) {
  let { currentPage, onPageChange } = usePagination();
  let { columns, dataSource, pageSize } = toRefs(props);
  let { renderColumns } = useTableHead(columns);

  let { onTableSort, renderList } = useTableSort(
    dataSource,
    currentPage,
    pageSize
  );

  return {
    renderColumns,
    onTableSort,
    currentPage,
    onPageChange,
    renderList,
  };
}
