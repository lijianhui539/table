/**
 * @file 表格body
 */

import { defineComponent, inject } from "vue";
import { TABLE_PROPS } from "./const";
import { useTableBody } from "../hooks/useTableBody";
import TableBodyCell from "./TableBodyCell";
import lodashIsString from "lodash/isString";
import lodashGet from "lodash/get";

export default defineComponent({
  name: "TableBody",
  setup() {
    let { props, currentPage } = inject(TABLE_PROPS)!;
    let { renderList } = useTableBody(props, currentPage);
    return () => {
      return (
        <>
          <tbody>
            {renderList.value.map((row) => {
              return (
                <tr key={props.rowKey(row)}>
                  {Array.isArray(props.columns) &&
                    props.columns.map((column) => (
                      <TableBodyCell rowData={row} column={column} />
                    ))}
                </tr>
              );
            })}
          </tbody>
        </>
      );
    };
  },
});
