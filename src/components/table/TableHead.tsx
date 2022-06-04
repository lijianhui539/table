/**
 * @file 表格head
 */

import { defineComponent, toRefs } from "vue";
import { type TableHeadProps, tableHeadProps } from "../types/table";
import TableHeadCell from "./TableHeadCell";

export default defineComponent({
  name: "TableHead",
  props: tableHeadProps,
  setup(props: TableHeadProps) {
    return () => {
      let { columns, sortOptions } = toRefs(props);
      return (
        <>
          <thead>
            <tr>
              {Array.isArray(columns.value) &&
                columns.value.map((col) => (
                  <TableHeadCell
                    column={col}
                    sortOptions={sortOptions.value}
                  ></TableHeadCell>
                ))}
            </tr>
          </thead>
        </>
      );
    };
  },
});
