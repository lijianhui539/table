import { shallowMount, mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import SimpleTable from "../src/components/table";
import type { DataSourceType, TableProps } from "../src/components/table/types";
import { h } from "vue";
import TableHead from "../src/components/table/TableHead";
import TableHeadCell from "../src/components/table/TableHeadCell";
import TableBody from "../src/components/table/TableBody";
import TableBodyCell from "../src/components/table/TableBodyCell";
// 创建数据
function createTestData(dataCount: number): DataSourceType[] {
  let resData: DataSourceType[] = [];
  for (let index = 0; index < dataCount; index++) {
    resData.push({
      key: index,
      name: `Edrward ${index}`,
      // 生成随机年龄 展示排序功能时使用
      age: Math.ceil(Math.random() * 100),
      address: `London Park no. ${index}`,
      tags: ["nice", "developer"],
    });
  }
  return resData;
}
const mountTable = (options: TableProps) => mount(SimpleTable, options);

// 验证 table 传入dataSource columns
test("test table dataSource and columns", () => {
  let dataSource = createTestData(200);
  let columns = [
    {
      title: "姓名",
      key: "name",
    },
    {
      title: "年龄",
      key: "age",
      sortable: true,
    },
    {
      title: "住址",
      key: "address",
      render: (value: DataSourceType) => {
        return h("div", value.address);
      },
    },
  ];

  const wrapper = mountTable({
    dataSource: dataSource,
    columns: columns,
    pageSize: 10,
    rowKey: (row) => row.key,
  });

  console.log(wrapper.findAllComponents(TableHeadCell));

  // expect(wrapper.find("tbody").findAll("tr").length).toBeTruthy();
  // console.log(wrapper.find("tbody").findAll("tr"));
  columns.forEach((item) => {
    // expect(wrapper.findComponent(TableBody)).toBeTruthy();
    // console.log(wrapper.findAllComponents(TableHeadCell));
    
  });

  // expect(wrapper.html()).toMatchSnapshot();
});
