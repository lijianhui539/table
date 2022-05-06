
import { ref } from "vue"
export function usePagination() {
  let current = ref(1);
  let onPageChange = (pageNumber: number) => {
    current.value = pageNumber;
  };

  return {
    current,
    onPageChange
  }
}