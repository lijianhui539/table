
export type ColumnType = {
    key: string;
    title: string;
    render?: (row: any) => JSX.Element
}

export type TableProps<T=any> =  {
  dataSource: T[];
  columns: ColumnType[];
  rowKey: (row: ColumnType) => string;
  pageSize: number;
}