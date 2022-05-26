/** 
  @file 表格内容处理逻辑
*/

import type { TableProps, DataSourceType } from "../table/types";
import { Ref, onMounted, watch, ref, onBeforeUnmount } from "vue";
import { TableSort } from "../table/const";
import cloneDeep from "lodash/cloneDeep";
import PubSub from "pubsub-js";
import { Logger } from '@src/utils/logger';
const MODULE = 'table-body'

type DataSourceTypeKeys = keyof DataSourceType;

export function useTableBody(props: TableProps, currentPage: Ref<number>) {
  let renderList: Ref<DataSourceType[]> = ref([]);
  let { pageSize, dataSource } = props

  // 异常处理
  if (!Array.isArray(dataSource)) {
    Logger.error(MODULE, 'error: dataSource Expected Array');
    dataSource = []
  }

  // 记录源数据 取消排序时使用
  let sourceData: DataSourceType[] = cloneDeep(dataSource);
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
      // 排序状态下翻页  只有数字排序有效果
      if (recordFieldKey && recordSortType && recordFieldKey === "age") {  // todo: 必须指定字段才能规避ts报错问题 待学习ts后解决
        dataSource = fnSortTable(
          dataSource,
          recordFieldKey,
          recordSortType,
          sourceData
        );
      }

      // 分页
      renderList.value = dataSource.slice(
        (currentPage.value - 1) * pageSize,
        currentPage.value * pageSize
      );
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
      dataSource,
      fieldKey as "age",
      sortType,
      sourceData
    ).slice(
      (currentPage.value - 1) * pageSize,
      currentPage.value * pageSize
    );

    // 排序完回第一页
    currentPage.value = 1
  };

  onMounted(() => {
    pubSubToken = PubSub.subscribe("table-head-sort", tableHeadSort);
    Logger.trace(MODULE, 'mount table-head-sort event seccuss')
  });

  onBeforeUnmount(() => {
    PubSub.unsubscribe(pubSubToken);
    Logger.trace(MODULE, 'unmount table-head-sort event seccuss')
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
