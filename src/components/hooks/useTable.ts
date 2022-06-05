/** 
  @file 处理整个表格逻辑
*/

import { toRefs } from "vue";
import type { TableProps, SortOptions } from "../types/table";
import { useTableHead } from "./useTableHead";
import { useTableSort } from "./useTableSort";
import { usePagination } from "./usePagination";

export function useTableDataSource(props: TableProps, emitSortOpts: (sortOptions: SortOptions) => void) {
  let { currentPage, onPageChange } = usePagination();
  let { columns, dataSource, pageSize } = toRefs(props);
  let { renderColumns } = useTableHead(columns);

  let { onTableSort, renderList } = useTableSort(
    dataSource,
    currentPage,
    pageSize,
    emitSortOpts
  );

  return {
    renderColumns,
    onTableSort,
    currentPage,
    onPageChange,
    renderList,
  };
}
