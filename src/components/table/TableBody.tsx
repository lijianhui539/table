import { defineComponent, inject } from "vue";
import { TABLE_PROPS } from "./const"
import { useTable } from "../hooks/useTable"
import lodashIsString from 'lodash/isString'

export default defineComponent({
    name: "TableBody",
    setup() {

        let { props, current } = inject(TABLE_PROPS)!
        let { renderList } = useTable(props, current)
        return () => {
            return (
                <>
                    <tbody>
                        {renderList.value.map((row) => {
                            return (
                                <tr key={props.rowKey(row)}>
                                    {props.columns.map((cell) => {
                                        return cell.render ? (
                                            <td key={cell.key}>{lodashIsString(cell.render)?cell.render:cell.render(row)}</td>
                                        ) : (
                                            <td key={cell.key} title={row[cell.key]}>
                                                {row[cell.key]}
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
