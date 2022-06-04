/**
 * @file 表格body单元格
 */

import { defineComponent } from "vue";
import { tableBodyCellProps } from "../types/table";
import lodashIsString from "lodash/isString";
import lodashGet from "lodash/get";

export default defineComponent({
  name: "TableBodyCell",
  props: tableBodyCellProps,
  setup(props) {
    return () => {
      let { column, rowData } = props;
      return (
        <>
          {column.render ? (
            <td>
              {lodashIsString(column.render)
                ? column.render
                : column.render(rowData)}
            </td>
          ) : (
            <td key={column.key} title={lodashGet(rowData, column.key, "")}>
              {lodashGet(rowData, column.key, "-")}
            </td>
          )}
        </>
      );
    };
  },
});
