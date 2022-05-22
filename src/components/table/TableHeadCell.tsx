/**
 * @file 表头单元格
 */

import { defineComponent, inject } from "vue";
import type { TableHeadCellProps } from "./types";
import { tableHeadCellProps } from "./types";
import { useTableHeadCell } from "../hooks/useTableHeadCell";
import { TableSort, TABLE_PROPS } from "./const";
import classnames from "classnames";

export default defineComponent({
  name: "TableHeadCell",
  props: tableHeadCellProps,
  setup(props: TableHeadCellProps) {
    let { onTableSort } = inject(TABLE_PROPS)!;
    let { onSort } = useTableHeadCell(props, onTableSort);

    return () => {
      return (
        <>
          <td>
            <span key={props.column.key}>
              {props.column.title}
              {props.column.sortable ? (
                <span
                  onClick={() => {
                    onSort(props.column.key);
                  }}
                  class={classnames(
                    "iconfont",
                    "sort-icon",
                    "icon-shangjiantou",
                    {
                      "table-head__sort-active":
                        props.column.sort !== TableSort.Disable,
                      "icon-xiajiantou": props.column.sort === TableSort.Desc,
                    }
                  )}
                ></span>
              ) : (
                ""
              )}
            </span>
          </td>
        </>
      );
    };
  },
});
