/**
 * @file table
 */

import { defineComponent, provide, toRefs } from "vue";
import { tableProps } from "./types";
import type { TableProps, SortOptions } from "./types";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Pagination from "../pagination";
import { TABLE_PROPS } from "./const";
import { useTable } from "../hooks/useTable";

export default defineComponent({
  name: "SimpleTable",
  props: tableProps,
  components: {
    Pagination,
    TableBody,
    TableHead,
  },
  setup(props: TableProps, { emit }) {
    let { dataSource, pageSize } = toRefs(props);
    let { currentPage, onPageChange, renderColumns } = useTable(props);

    // provide 外发sort事件 提供给内部排序使用
    let onTableSort = (resSortOption: SortOptions) => {
      emit("sort-change", resSortOption);
    };
    
    let tableData = {
      currentPage,
      props,
      onTableSort,
    };

    // 提供给body使用
    provide(TABLE_PROPS, tableData);

    return () => {
      return (
        <>
          <table class="is-bordered is-hoverable is-fullwidth table">
            <TableHead columns={renderColumns.value}></TableHead>
            <TableBody></TableBody>
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
