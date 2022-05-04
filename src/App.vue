<template>
  <SimpleTable :dataSource="dataSource" :columns="columns" :rowKey="(row) => row.key" />
</template>

<script lang="ts">
import { ref, Ref } from "vue";
import SimpleTable from "./components/table/SimpleTable";
interface TableSource {
  key: number;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
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
        age: 18 + index,
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
      },
      {
        title: "住址",
        key: "address",
        render: (value: any) => {
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
