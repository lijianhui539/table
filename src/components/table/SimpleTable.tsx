/**
 * @file table
 */

import { defineComponent, provide, toRefs } from "vue";
import { tableProps } from "../types/table";
import type { TableProps, SortOptions } from "../types/table";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Pagination from "../pagination";
import { TABLE_PROPS } from "../const/table";
import { useTableDataSource } from "../hooks/useTable";

export default defineComponent({
  name: "SimpleTable",
  props: tableProps,
  components: {
    Pagination,
    TableBody,
    TableHead,
  },
  emits: ["table-sort"],
  setup(props: TableProps, { emit }) {
    let emitSortOpts = (sortOptions: SortOptions) => {
      emit("table-sort", sortOptions);
    };
    let { dataSource, pageSize, rowKey } = toRefs(props);
    let { renderColumns, onTableSort, currentPage, onPageChange, renderList } =
      useTableDataSource(props, emitSortOpts);
    let tableData = {
      onTableSort,
    };
    provide(TABLE_PROPS, tableData);

    return () => {
      return (
        <>
          <table class="is-bordered is-hoverable is-fullwidth table">
            <TableHead columns={renderColumns.value}></TableHead>
            <TableBody
              rowKey={rowKey.value}
              renderList={renderList.value}
              columns={renderColumns.value}
            ></TableBody>
          </table>
          <Pagination
            total={dataSource.value.length}
            currentPage={currentPage.value}
            pageSize={pageSize.value}
            onChange={(val: number) => onPageChange(val)}
          ></Pagination>
        </>
      );
    };
  },
});
