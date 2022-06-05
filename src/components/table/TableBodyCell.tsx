/**
 * @file 表格body单元格
 */

import { defineComponent, toRefs } from "vue";
import { tableBodyCellProps } from "../types/table";
import lodashIsString from "lodash/isString";
import lodashGet from "lodash/get";

export default defineComponent({
  name: "TableBodyCell",
  props: tableBodyCellProps,
  setup(props) {
    return () => {
      let { column, rowData } = toRefs(props);
      return (
        <>
          {column.value.render ? (
            <td>
              {lodashIsString(column.value.render)
                ? column.value.render
                : column.value.render(rowData.value)}
            </td>
          ) : (
            <td
              key={column.value.key}
              title={lodashGet(rowData.value, column.value.key, "")}
            >
              {lodashGet(rowData.value, column.value.key, "-")}
            </td>
          )}
        </>
      );
    };
  },
});
