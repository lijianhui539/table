/**
 * @file 表格body
 */

import { defineComponent, inject } from "vue";
import { TABLE_PROPS } from "./const";
import { useTableBody } from "../hooks/useTableBody";
import lodashIsString from "lodash/isString";
import lodashGet from "lodash/get"

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
                  {props.columns.map((cell) => {
                    return cell.render ? (
                      <td key={cell.key}>
                        {lodashIsString(cell.render)
                          ? cell.render
                          : cell.render(row)}
                      </td>
                    ) : (
                      <td key={cell.key} title={lodashGet(row, cell.key, '')}>
                        {lodashGet(row, cell.key, '-')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </>
      );
    };
  },
});
