/**
 * @file 表格head
 */

import { defineComponent } from "vue";
import { type TableHeadProps, tableHeadProps } from "./types";
import TableHeadCell from "./TableHeadCell";

export default defineComponent({
  name: "TableHead",
  props: tableHeadProps,
  setup(props: TableHeadProps) {
    return () => {
      return (
        <>
          <thead>
            <tr>
              {Array.isArray(props.columns) &&
                props.columns.map((column) => (
                  <TableHeadCell
                    column={column}
                    sortOptions={props.sortOptions}
                  ></TableHeadCell>
                ))}
            </tr>
          </thead>
        </>
      );
    };
  },
});
