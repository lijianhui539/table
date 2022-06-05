import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import SimpleTable from "../src/components/table";
import type { DataSourceType } from "../src/components/types/table";
import TableBody from "../src/components/table/TableBody";
import Pagination from "../src/components/pagination";
import TableBodyCell from "../src/components/table/TableBodyCell";

const DATA_COUNT = 100
const TSET_PAGINATION = 20

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
  },
];


// 验证 table 分页器
test("test table pagination", () => {
  const wrapper = mountTable({
    propsData: {
      dataSource: dataSource,
      columns: columns,
      pageSize: TSET_PAGINATION,
      rowKey: (row) => row.key,
    }
  });
  // 修改pageSize 验证条数
  const TR_LIST = wrapper.findComponent(TableBody).findAll('tr');
  expect(TR_LIST.length).toBe(TSET_PAGINATION);
});

// 验证 table 分页器页数改变
test("test table pagination page change", async () => {
  const wrapper = mountTable({
    propsData: {
      dataSource: dataSource,
      columns: columns,
      pageSize: TSET_PAGINATION,
      rowKey: (row) => row.key,
    }
  });
  // 修改pageSize 验证条数
  const PAGE_LIST = wrapper.findComponent(Pagination).findAll('.pagination-link');

  // 点击第二页
  await PAGE_LIST[1].trigger('click')
  let bodyCells = wrapper.findAllComponents(TableBodyCell);
  let trList = wrapper.findComponent(TableBody).findAll('tr');
  trList.forEach((item, index) => {
    let fristTdIndex = 20 + index
    expect(bodyCells.at(index * 3).html()).toContain(fristTdIndex.toString());
  });
});


// 验证 table 分页器跳页输入框校验
test("test table pagination jump input check", () => {
  const wrapper = mountTable({
    propsData: {
      dataSource: dataSource,
      columns: columns,
      pageSize: TSET_PAGINATION,
      rowKey: (row) => row.key,
    }
  });
  const PAGINATION_INPUT = wrapper.findComponent(Pagination).find('.pagination-jump__input');
  PAGINATION_INPUT.setValue('哈哈')
  expect(PAGINATION_INPUT.text()).toBe('');
});
