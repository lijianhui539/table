import { defineComponent, ref } from "vue";
import type { TableProps } from "./types";
import Pagination from "../pagination";

export default defineComponent({
  name: "SimpleTable",
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    rowKey: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  components: {
    Pagination,
  },
  setup(props: TableProps, { attrs, emit, slots }) {
 
    let current = ref(1);
    let onPageChange = (pageNumber: number) => {
      current.value = pageNumber
    };
    
    let renderList = props.columns.map(item => {})

    return () => {
      return (
        <>
          <table class="is-bordered is-hoverable is-fullwidth table">
            <thead>
              <tr>
                {props.columns.map((item) => {
                  return (
                    <td
                      key={item.key}
                      class="icon-shangjiantou"
                      title={item.title}
                    >
                      {item.title}
                    </td>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {props.dataSource.map((row) => {
                return (
                  <tr key={props.rowKey(row)}>
                    {props.columns.map((cell) => {
                      return cell.render ? (
                        <td key={cell.key}>{cell.render(row)}</td>
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
          </table>
          <Pagination
            total={props.dataSource.length}
            current={current.value}
            pageSize={props.pageSize}
            onChange={(val) => onPageChange(val)}
          ></Pagination>
        </>
      );
    };
  },
});
