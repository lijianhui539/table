import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import SimpleTable from "../src/components/table";
import type { DataSourceType } from "../src/components/types/table";
import { h } from "vue";
import TableHeadCell from "../src/components/table/TableHeadCell";
import TableBodyCell from "../src/components/table/TableBodyCell";

const DATA_COUNT = 10
const PAGE_SIZE = 10

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
const mountTable = (options) => mount(SimpleTable, options);

// 验证 table 传入dataSource columns
test("test table dataSource and columns", () => {
  let dataSource = createTestData(DATA_COUNT);
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
    propsData: {
      dataSource: dataSource,
      columns: columns,
      pageSize: PAGE_SIZE,
      rowKey: (row) => row.key,
    }
  });


  // 验证头部渲染正常
  const headerCells = wrapper.findAllComponents(TableHeadCell);

  // 验证单元格渲染内容
  columns.forEach((column, idx) => {
    expect(headerCells.at(idx).html().includes(column.title)).toBeTruthy();
  });

  // 验证表格内容渲染正常
  const bodyCells = wrapper.findAllComponents(TableBodyCell);

  // 验证渲染单元格数
  if (PAGE_SIZE > DATA_COUNT) {
    // 没有分页 最大td就是 DATA_COUNT
    expect(bodyCells.length).toEqual(DATA_COUNT * 3);
  } else {
    // 有分页最大td 单元格数3 * 行数PAGE_SIZE
    expect(bodyCells.length).toEqual(PAGE_SIZE * 3);
  }

  // 验证单元格渲染内容
  dataSource.forEach((item, index) => {
    expect(bodyCells.at(index * 3).html().includes(item.name)).toBeTruthy();
    expect(bodyCells.at(index * 3 + 1).html().includes((item.age).toString())).toBeTruthy();
    expect(bodyCells.at(index * 3 + 2).html().includes(item.address)).toBeTruthy();
  });
});
