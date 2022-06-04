/** 
  @file 外层表格处理逻辑
*/

import { ref } from "vue";

export function usePagination() {
  let currentPage = ref(1);
  let onPageChange = (pageNumber: number) => {
    currentPage.value = pageNumber;
  };

  return {
    currentPage,
    onPageChange,
  };
}
