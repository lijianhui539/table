/**
 * @file table类型定义
 */

import { PropType, ExtractPropTypes, VNode } from "vue";
export type ColumnType = {
  key: string;
  title: string;
  render?: string | ((row: DataSourceType) => VNode);
  sort?: string;
  sortable?: boolean;
};

export type DataSourceType = {
  key: number;
  name: string;
  age: number;
  address: string;
  tags: string[];
};

// 排序事件emit的对象
export type SortOptions = {
  sortKey: string;
  sortType: string;
};

// 表头 props
export const tableHeadProps = {
  columns: {
    type: Array as PropType<ColumnType[]>,
    default: () => [],
  },
  sortOptions: {
    type: Object as PropType<SortOptions>,
    default: () => ({}),
  },
};

// 表头 单元格 props
export const tableHeadCellProps = {
  column: {
    type: Object as PropType<ColumnType>,
    default: () => ({}),
  },
  sortOptions: {
    type: Object as PropType<SortOptions>,
    default: () => ({}),
  },
};

export const tableBodyCellProps = {
  rowData: {
    type: Object as PropType<DataSourceType>,
    default: () => ({}),
  },
  column: {
    type: Object as PropType<ColumnType>,
    default: () => ({}),
  },
};

// table props
export const tableProps = {
  dataSource: {
    type: Array as PropType<DataSourceType[]>,
    default: () => [],
  },
  columns: {
    type: Array as PropType<ColumnType[]>,
    default: () => [],
  },
  rowKey: {
    type: Function as PropType<(record: DataSourceType) => string | number>,
    default: () => {
      return () => "";
    },
  },
  pageSize: { type: Number, default: 10 },
};

export type TableProps = ExtractPropTypes<typeof tableProps>;
export type TableHeadProps = ExtractPropTypes<typeof tableHeadProps>;
export type TableHeadCellProps = ExtractPropTypes<typeof tableHeadCellProps>;
