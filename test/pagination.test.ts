import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import SimpleTable from "../src/components/table";
import type { DataSourceType } from "../src/components/table/types";
import TableBody from "../src/components/table/TableBody";
import Pagination from '../src/components/pagination/index'

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
test("test table pagination", async () => {
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


// 验证 table 分页器 下一页 和 上一页
test("test table pagination next page and pre page", async () => {
  const wrapper = mountTable({
    propsData: {
      dataSource: dataSource,
      columns: columns,
      pageSize: 10,
      rowKey: (row) => row.key,
    }
  });
  const TABLE_BODY = wrapper.findComponent(TableBody)
  await wrapper.findComponent(Pagination).find('.pagination-next').trigger('click');
  TABLE_BODY.findAll('tr').forEach((item, index) => {
    // name字段拼接了index 通过index对比判断是否分页成功
    let pageIndex = index + 10
    let nameTd = item.findAll('td')[0]
    expect(nameTd.html()).toContain(pageIndex)
  })

  await wrapper.findComponent(Pagination).find('.pagination-previous').trigger('click');
  TABLE_BODY.findAll('tr').forEach((item, index) => {
    let nameTd = item.findAll('td')[0]
    expect(nameTd.html()).toContain(index)
  })
});


// 验证 table 分页器 禁用 下一页 和 上一页
test("test table pagination next page and pre page disable", async () => {
  let dataSource = createTestData(5);

  const wrapper = mountTable({
    propsData: {
      dataSource: dataSource,
      columns: columns,
      pageSize: 10,
      rowKey: (row) => row.key,
    }
  });
  // 上一页 下一页按钮 包含禁用 pagination-button-disabled
  let pagePre = wrapper.findComponent(Pagination).find('.pagination-previous');
  let pageNext = wrapper.findComponent(Pagination).find('.pagination-next');
  expect(pageNext.html()).toContain('pagination-button-disabled')
  expect(pagePre.html()).toContain('pagination-button-disabled')
});


// 验证 table 分页器 跳页
test("test table pagination jump page", async () => {
  const wrapper = mountTable({
    propsData: {
      dataSource: dataSource,
      columns: columns,
      pageSize: 10,
      rowKey: (row) => row.key,
    }
  });

  const TABLE_BODY = wrapper.findComponent(TableBody)
  wrapper.findComponent(Pagination).find('.pagination-jump__input').setValue(3);
  await wrapper.findComponent(Pagination).find('.pagination-jump__go').trigger('click');
  TABLE_BODY.findAll('tr').forEach((item, index) => {
    let pageIndex = index + 20
    let nameTd = item.findAll('td')[0]
    expect(nameTd.html()).toContain(pageIndex)
  })

});
