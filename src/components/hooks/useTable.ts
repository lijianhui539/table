import type { TableProps } from "../table/types";
import { Ref, computed, ComputedRef } from "vue";

export function useTable(props: TableProps, current: Ref<number>) {
  let renderList: ComputedRef<any[]> = computed(() => {
    return props.dataSource.slice(
      (current.value - 1) * props.pageSize,
      current.value * props.pageSize
    );
  });

  return {
    renderList,
  };
}
