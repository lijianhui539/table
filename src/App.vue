<template>
  <Table
    :dataSource="dataSource"
    :columns="columns"
    :rowKey="(row) => row.key"
  />
</template>

<script lang="ts">
import { ref, Ref } from "vue";
import Table from "./components/table/index";
interface TableSource {
  key: number;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
export default {
  components: {
    Table,
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
        title: "姓名",
        key: "name",
      },
      {
        title: "年龄",
        key: "age",
        sortable: true
      },
      {
        title: "住址",
        key: "address",
        render: (value: TableSource) => {
          return value.address;
        },
      },
    ]);

    return {
      dataSource,
      columns,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px;
}
</style>
