/** 
  @file 分页器
*/

import { defineComponent, ref, Ref, toRefs } from "vue";
import type { PaginationTypes } from "./types";
import classnames from "classnames";
import { Logger } from '@src/utils/logger';
const MODULE = 'pagination'

export default defineComponent({
  name: "Pagination",
  props: {
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  emits: ["change"],
  setup(props: PaginationTypes, { emit }) {
    let { currentPage } = toRefs(props);

    let jumpPage: Ref<string | number> = ref("");
    let handleClick = (pageNumber: number, pageCount: number) => {
      if (pageNumber > pageCount || pageNumber < 1) {
        return;
      }

      Logger.trace(MODULE, `handle page change pageNumber currentPageNumber: ${JSON.stringify(pageNumber)}`)
      emit("change", pageNumber);
    };

    let onInputChange = (event: Event) => {
      (event.target as HTMLInputElement).value = (
        event.target as HTMLInputElement
      ).value.replace(/[^0-9]/g, "");
      if ((event.target as HTMLInputElement).value !== "") {
        jumpPage.value = Number((event.target as HTMLInputElement).value);
      } else {
        jumpPage.value = "";
      }
    };

    return () => {
      // 总页数
      const pageCount = Math.ceil(props.total / props.pageSize);
      const indexes: number[] = new Array(pageCount);
      for (let i = 0; i < pageCount; i++) {
        indexes[i] = i + 1;
      }

      // 页码是否被省略
      let isShowBtn = (index: number) => {
        if (pageCount < 8) {
          return true;
        } else {
          if (index === 1 || index === pageCount) {
            return true;
          } else {
            if (currentPage.value < 4 && index < 6) {
              return true;
            } else if (
              currentPage.value > pageCount - 4 &&
              index > pageCount - 6
            ) {
              return true;
            } else if (
              index < currentPage.value + 3 &&
              index > currentPage.value - 3
            ) {
              return true;
            } else {
              return false;
            }
          }
        }
      };

      // 是否显示省略号
      let isShowEllipsis = (index: number) => {
        return index === 2 || index === pageCount - 1;
      };

      return (
        <>
          <div class="pagination is-centered">
            <a
              class={classnames("pagination-previous", {
                "pagination-button-disabled": currentPage.value === 1,
              })}
              onClick={() => handleClick(currentPage.value - 1, pageCount)}
            >
              上一页
            </a>
            <a
              class={classnames("pagination-next", {
                "pagination-button-disabled": currentPage.value === pageCount,
              })}
              onClick={() => handleClick(currentPage.value + 1, pageCount)}
            >
              下一页
            </a>
            <div class="pagination-list">
              {indexes.map((item) => {
                if (isShowBtn(item)) {
                  return (
                    <span onClick={() => handleClick(item, pageCount)}>
                      <a
                        class={classnames("pagination-link", {
                          "is-current": currentPage.value === item,
                        })}
                      >
                        {item}
                      </a>
                    </span>
                  );
                } else if (isShowEllipsis(item)) {
                  return <span class="pagination-ellipsis">&hellip;</span>;
                }
              })}
              <div class="pagination pagination-jump">
                跳转至
                <input
                  class="pagination-jump__input input"
                  value={jumpPage.value}
                  onInput={(event) => onInputChange(event)}
                  type="text"
                />
                页
                <a
                  class="pagination-next"
                  onClick={() =>
                    handleClick(jumpPage.value as number, pageCount)
                  }
                >
                  GO
                </a>
              </div>
            </div>
          </div>
        </>
      );
    };
  },
});
