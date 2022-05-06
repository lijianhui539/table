import { defineComponent, provide } from "vue";
import { type TableProps, tableProps } from "./types";
import TableHead from "./TableHead"
import TableBody from "./TableBody";
import Pagination from "../pagination";
import { TABLE_PROPS } from "./const"
import { usePagination } from "../hooks/usePagination"
export default defineComponent({
  name: "SimpleTable",
  props: tableProps,
  components: {
    Pagination,
    TableBody,
    TableHead
  },
  setup(props: TableProps) {
    let { dataSource, pageSize } = props
    let { current, onPageChange } = usePagination()
    let tableData = {
      current,
      props
    }

    // 提供给body使用
    provide(TABLE_PROPS, tableData)
    return () => {

      return (
        <>
          <table class="is-bordered is-hoverable is-fullwidth table">
            <TableHead columns={props.columns}></TableHead>
            <TableBody></TableBody>
          </table>
          <Pagination
            total={dataSource.length}
            current={current.value}
            pageSize={pageSize}
            onChange={(val) => onPageChange(val)}
          ></Pagination>
        </>
      );
    };
  },
});
