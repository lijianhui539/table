import { PropType, VNodeChild, ExtractPropTypes } from "vue";
export type ColumnType = {
  key: string;
  title: string;
  render?: string | ((row: any) => VNodeChild);
  sort?: string;
  sortable?: boolean;
};

// 表头 props
export const tableHeadProps = {
  columns: {
    type: Array as PropType<ColumnType[]>,
    default: () => [],
  },
};


// table props
export const tableProps = {
  dataSource: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  columns: {
    type: Array as PropType<ColumnType[]>,
    default: () => [],
  },
  rowKey: {
    type: Function as PropType<(record: ColumnType) => string>,
    default: () => { return () => '' },
  },
  pageSize: { type: Number, default: 10 },
};

export type TableProps = ExtractPropTypes<typeof tableProps>;
export type TableHeadProps = ExtractPropTypes<typeof tableHeadProps>;