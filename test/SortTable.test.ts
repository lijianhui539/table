import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import SimpleTable from "../src/components/table";
import TableBodyCell from "../src/components/table/TableBodyCell";

const PAGE_SIZE = 10

const mountTable = (options) => mount(SimpleTable, options);

// 验证 table 传入dataSource columns
test("test table sort", async () => {
  let dataSource = [
    {
      name: `Edrward 0`,
      age: 30,
    },
    {
      name: `Edrward 1`,
      age: 20,
    },
    {
      name: `Edrward 2`,
      age: 40,
    }
  ];
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
  ];


  const wrapper = mountTable({
    propsData: {
      dataSource: dataSource,
      columns: columns,
      pageSize: PAGE_SIZE,
      rowKey: (row) => row.key,
    }
  });

  // 点击升序
  await wrapper.find('.sort-icon').trigger('click')
  const bodyCells = wrapper.findAllComponents(TableBodyCell);
  expect(bodyCells[1].html()).toContain('20');
  expect(bodyCells[3].html()).toContain('30');
  expect(bodyCells[5].html()).toContain('40');

  //点击降序
  await wrapper.find('.sort-icon').trigger('click')
  expect(bodyCells[1].html()).toContain('40');
  expect(bodyCells[3].html()).toContain('30');
  expect(bodyCells[5].html()).toContain('20');

  //点击恢复默认排序
  await wrapper.find('.sort-icon').trigger('click')
  expect(bodyCells[1].html()).toContain('30');
  expect(bodyCells[3].html()).toContain('20');
  expect(bodyCells[5].html()).toContain('40');
});

