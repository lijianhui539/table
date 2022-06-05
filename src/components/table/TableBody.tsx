/**
 * @file 表格body
 */

import { defineComponent, toRefs } from "vue";
import TableBodyCell from "./TableBodyCell";
import { tableBodyProps } from "../types/table";

export default defineComponent({
  name: "TableBody",
  props: tableBodyProps,
  setup(props) {
    let { renderList, columns, rowKey } = toRefs(props);
    return () => {
      return (
        <>
          <tbody>
            {renderList.value.map((row) => {
              return (
                <tr key={rowKey.value(row)}>
                  {Array.isArray(columns.value) &&
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
