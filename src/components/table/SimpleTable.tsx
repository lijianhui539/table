import { defineComponent, ref } from "vue";
import type { TableProps, ColumnType } from "./types";
import Pagination from "../pagination";
import classnames from 'classnames'
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
  setup(props: TableProps) {
    let current = ref(1);
    let onPageChange = (pageNumber: number) => {
      current.value = pageNumber;
    };

    return () => {
      let renderList: ColumnType[] = props.dataSource.slice(
        (current.value - 1) * props.pageSize,
        current.value * props.pageSize
      );

      return (
        <>
          <table class="is-bordered is-hoverable is-fullwidth table">
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
            <tbody>
              {renderList.map((row) => {
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
