# API

```ts
<template>
    <SimpleTable :data="tableOptions.data"
                 :columns="tableOptions.columns"
				 :hideHeader="true"
                 :bufferview="true"
                 :rowKey="(row) => row.key"
				 @select="handleTableSelect"
                 @select-all="handleTableSelectAll"
                 @row-click="handleTableRowClick"
                 @sort-change="handleSortChange"
    </SimpleTable>
</template>
<script lang="ts">
import { ref, Ref, h } from "vue";
import SimpleTable from "./components/table/index";
export default {
  components: {
    SimpleTable,
  },
  setup() {
    let dataSource: Ref<TableSource[]> = ref([]);
    for (let index = 0; index < 150; index++) {
      dataSource.value.push({
        key: index,
        name: `Edrward ${index}`,
        // 生成随机年龄 展示排序功能时使用
        age: Math.ceil(Math.random() * 100),
        address: `London Park no. ${index}`,
        tags: ["nice", "developer"],
      });
    }

    let columns = ref([
      {
          type: 'selection', // 多选
          width: 60, // 列宽
          align: 'center'
      },
      {
          type: 'index', // 序号
          width: 60,
          align: 'center'
      },
      {
        title: "姓名",
        key: "name",
        align: 'center', // 对齐方式
      },
      {
        title: "年龄",
        key: "age",
        sortable: true, // 开启排序
        filterable: {
          menus: [
            { key: 'over', label: '大于60' },
            { key: 'under', label: '小于18' },
          ],
          multiple: false,
          filter: (currentFilterBy, record) => {
            const isOver = currentFilterBy.includes('over')
            return isOver ? record.age > 60 : record.age < 18
          },
        },
      },
      {
        title: "住址",
        key: "address",
        render: (value: TableSource) => {  // render 自定义单元格
          return h('div',value.address)
        },
      },
    ]);
      
      // table 单选方法
      let handleTableSelect = (selection, row) => {
          //   selection：已选项数据  row：刚选择的项数据
      }
      // table 全选方法
      let handleTableSelectAll = (selection) => {
          //   selection：已选项数据
      }
      // table 行点击
      let handleTableRowClick = (row, index) => {
          //   row：点击行的项数据  index 索引
      }
      // table 单选方法
      let handleSortChange = (key, order) => {
          //   key:排序的字段  order: 排序的顺序,值为 asc 或 desc
      }

    return {
      dataSource,
      columns,
      handleTableSelect,
      handleTableSelectAll,
      handleTableRowClick,
      handleSortChange
    };
  },
};
</script>
```



#### TableProps

| 参数       | 说明                                      | 类型                             | 默认值 |
| ---------- | ----------------------------------------- | -------------------------------- | ------ |
| columns    | 表格列的配置描述,参见`TablePagination`    | TableColumn[]                    | -      |
| dataSource | 表格数据数组                              | object[]                         | -      |
| hideHeader | 隐藏表头                                  | boolean                          | false  |
| bufferview | 开启虚拟列表                              | boolean                          | false  |
| pagination | 分页器配置,参见`TablePagination` 传入     | boolean \| object                | -      |
| rowKey     | 表格行 key 的取值，可以是字符串或一个函数 | string \| (record:any) => string | -      |

#### TableColumn

| 参数       | 说明                       | 类型                                          | 默认值 |
| ---------- | -------------------------- | --------------------------------------------- | ------ |
| align      | 对齐方式                   | 'left' \| 'center' \| 'right'                 | 'left' |
| fixed      | 固定列                     | 'start' \| 'end'                              | -      |
| render     | 自定义单元格               | (record: any) => VNode \| string              | -      |
| title      | 列标题                     | 'string'                                      | -      |
| key        | 渲染字段                   | 'string'                                      | -      |
| sortable   | 当前列字段开启排序         | boolean                                       | false  |
| width      | 列宽                       | number \| string                              | -      |
| type       | 类型                       | 序号(index) \| 单选(radio) \| 多选(selection) | -      |
| filterable | 筛选配置,参见`TableFilter` | -                                             | -      |

#### TableFilter

| 参数     | 说明         | 类型                                             | 默认值 |
| -------- | ------------ | ------------------------------------------------ | ------ |
| menus    | 筛选条件     | object[]                                         | -      |
| multiple | 是否支持多选 | boolean                                          | true   |
| filter   | 筛选函数     | (currFilterBy: string[], record: any) => boolean | -      |

#### TablePagination

| 参数     | 说明                                   | 类型   | 默认值 |
| -------- | -------------------------------------- | ------ | ------ |
| pageSize | 每页条数                               | number | 10     |
| total    | 展示数据总条数                         | number | -      |
| current  | 当前页                                 | number | -      |
| size     | 分页器尺寸 设置'small'为最小分页器尺寸 | string | -      |

#### Event

| 事件名称   | 说明                               | 返回值                                                      |
| ---------- | ---------------------------------- | ----------------------------------------------------------- |
| select     | 在多选模式下有效，选中某一项时触发 | `selection`：已选项数据 `row`：刚选择的项数据               |
| selectAll  | 在多选模式下有效，点击全选时触发   | `selection`：已选项数据                                     |
| rowClick   | 单击某一行时触发                   | `row`:当前行的数据 `index`                                  |
| sortChange | 远程排序时，当点击排序时触发       | `key`：排序的字段 `order`：排序的顺序，值为 `asc` 或 `desc` |

#### 