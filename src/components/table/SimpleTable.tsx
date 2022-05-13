/**
 * @file table
 */

import { defineComponent, provide, toRefs } from "vue";
import { type TableProps, tableProps } from "./types";
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
  setup(props: TableProps) {
    let { dataSource, pageSize } = toRefs(props);
    let { currentPage, onPageChange } = useTable();
    let tableData = {
      currentPage,
      props,
    };

    // 提供给body使用
    provide(TABLE_PROPS, tableData);

    return () => {
      return (
        <>
          <table class="is-bordered is-hoverable is-fullwidth table">
            <TableHead columns={props.columns}></TableHead>
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
