/**
 * @file 表格head
 */

import { defineComponent } from "vue";
import { type TableHeadProps, tableHeadProps } from "./types";
import { useTableHead } from "../hooks/useTableHead";
import { TableSort } from "./const";
import classnames from "classnames";

export default defineComponent({
    name: "TableHead",
    props: tableHeadProps,
    setup(props: TableHeadProps) {
        let { onSort, columnsRenderList } = useTableHead(props.columns);
        return () => {
            return (
                <>
                    <thead>
                        <tr>
                            {columnsRenderList.value.map((item) => {
                                return (
                                    <td>
                                        <div
                                            key={item.key}
                                        >
                                            <span title={item.title}>{item.title}</span>
                                            {item.sortable}
                                            {item.sortable ? (
                                                <span
                                                    onClick={() => {
                                                        onSort(item.key);
                                                    }}
                                                    class={classnames(
                                                        "iconfont",
                                                        "sort-icon",
                                                        "icon-shangjiantou",
                                                        {
                                                            "table-head__sort-active":
                                                                item.sort !== TableSort.Disable,
                                                            "icon-xiajiantou": item.sort === TableSort.Desc,
                                                        }
                                                    )}
                                                ></span>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    </thead>
                </>
            );
        };
    },
});
