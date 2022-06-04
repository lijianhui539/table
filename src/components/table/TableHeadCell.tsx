/**
 * @file 表头单元格
 */

import { defineComponent, inject, toRefs } from "vue";
import type { TableHeadCellProps, SortOptions } from "../types/table";
import { tableHeadCellProps } from "../types/table";
import { TableSort, TABLE_PROPS } from "../const/table";
import classnames from "classnames";

export default defineComponent({
  name: "TableHeadCell",
  props: tableHeadCellProps,
  setup(props: TableHeadCellProps) {
    let { column } = toRefs(props);
    let { onTableSort } = inject(TABLE_PROPS)!;
    let onSort = () => {
      if (column.value.sort === TableSort.Disable) {
        column.value.sort = TableSort.Asc;
      } else if (column.value.sort === TableSort.Asc) {
        column.value.sort = TableSort.Desc;
      } else {
        column.value.sort = TableSort.Disable;
      }
      let resSortOptions: SortOptions = {
        fieldKey: column.value.key || "",
        sortType: column.value.sort || TableSort.Disable,
      };
      onTableSort(resSortOptions);
    };
    return () => {
      return (
        <>
          <td>
            <span key={column.value.key}>
              {column.value.title}
              {column.value.sortable ? (
                <span
                  onClick={onSort}
                  class={classnames(
                    "iconfont",
                    "sort-icon",
                    "icon-shangjiantou",
                    {
                      "table-head__sort-active":
                        column.value.sort !== TableSort.Disable,
                      "icon-xiajiantou": column.value.sort === TableSort.Desc,
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
