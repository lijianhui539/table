/** 
  @file 表格内容处理逻辑
*/

import type { TableProps, DataSourceType } from "../table/types";
import { Ref, onMounted, watch, ref, onBeforeUnmount } from "vue";
import { TableSort } from "../table/const";
import cloneDeep from "lodash/cloneDeep";
import PubSub from "pubsub-js";

type DataSourceTypeKeys = keyof DataSourceType;

export function useTableBody(props: TableProps, currentPage: Ref<number>) {
  let renderList: Ref<DataSourceType[]> = ref([]);
  let sourceData: DataSourceType[] = [];

  let pubSubToken = "";

  // 记录排序 和 排序字段 翻页时使用
  let recordFieldKey = "";
  let recordSortType = "";

  // 页码变化翻页
  watch(
    () => {
      currentPage.value;
    },
    () => {
      // 分页
      renderList.value = props.dataSource.slice(
        (currentPage.value - 1) * props.pageSize,
        currentPage.value * props.pageSize
      );

      // 记录源数据 取消排序时使用
      sourceData = cloneDeep(renderList.value);
      // 排序状态下翻页  只有数字排序有效果
      if (recordFieldKey && recordSortType && recordFieldKey === "age") {
        renderList.value = fnSortTable(
          renderList.value,
          recordFieldKey,
          recordSortType,
          sourceData
        );
      }
    },
    {
      immediate: true,
      deep: true,
    }
  );

  // 获取tableHead传出的排序字段和排序顺序
  let tableHeadSort = (
    msg: string,
    { fieldKey, sortType }: Record<string, string>
  ) => {
    // 记录排序字段和排序顺序
    recordFieldKey = fieldKey;
    recordSortType = sortType;

    // 排序
    renderList.value = fnSortTable(
      renderList.value,
      fieldKey as "age",
      sortType,
      sourceData
    );
  };

  onMounted(() => {
    pubSubToken = PubSub.subscribe("table-head-sort", tableHeadSort);
  });

  onBeforeUnmount(() => {
    PubSub.unsubscribe(pubSubToken);
  });
  return {
    renderList,
  };
}

/**
 * table排序方法
 * @param tableData 列表数据
 * @param field 排序字段
 * @param type 排序类型
 * @param sourceData 恢复默认排序的原始数据
 * @returns
 */
function fnSortTable(
  tableData: DataSourceType[],
  field: Extract<DataSourceTypeKeys, "age">,
  type: string,
  sourceData: DataSourceType[]
) {
  // 取消排序恢复数据
  if (type === TableSort.Disable) {
    return cloneDeep(sourceData);
  }

  //排序
  return tableData.sort((firstEl, secondEl) => {
    if (type === TableSort.Asc) {
      return firstEl[field] - secondEl[field];
    }
    return secondEl[field] - firstEl[field];
  });
}
