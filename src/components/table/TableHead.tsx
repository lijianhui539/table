import { defineComponent } from "vue";
import { type TableHeadProps, tableHeadProps } from "./types";

export default defineComponent({
    name: "TableHead",
    props: tableHeadProps,
    setup(props: TableHeadProps) {

        return () => {

            return (
                <>
                    <thead>
                        <tr>
                            {props.columns.map((item) => {
                                return (
                                    <td>
                                        <div key={item.key}>
                                            <span class="iconfont icon-shangjiantou"></span>
                                            <span title={item.title}>{item.title}</span>
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
