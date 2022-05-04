import { defineComponent, ref, Ref } from "vue";
import type { PaginationTypes } from "./types";
import classnames from "classnames";

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
    current: {
      type: Number,
      default: 1,
    },
  },
  emits: ["change"],
  setup(props: PaginationTypes, { emit }) {
    let jumpPage: Ref<string | number> = ref("");
    let handleClick = (pageNumber: number, pageCount: number) => {
      if (pageNumber > pageCount || pageNumber < 1) {
        return;
      }
      emit("change", pageNumber);
    };

    let onInputChange = (event: Event) => {
        (event.target as HTMLInputElement).value = (event.target as HTMLInputElement).value.replace(/[^0-9]/g, '')
        if((event.target as HTMLInputElement).value !== ''){
            jumpPage.value = Number((event.target as HTMLInputElement).value)
        }else {
            jumpPage.value = ''
        }
    }

    return () => {
      // 总页数
      const pageCount = Math.ceil(props.total / props.pageSize);
      const indexes: number[] = [];
      if (pageCount < 5) {
        for (let index = 1; index <= pageCount; index++) {
          indexes.push(index);
        }
      } else if (pageCount - props.current < 5) {
        for (let index = pageCount - 4; index <= pageCount; index++) {
          indexes.push(index);
        }
      } else if (props.current < 5) {
        for (let index = 1; index <= 5; index++) {
          indexes.push(index);
        }
      } else {
        for (
          let index = props.current - 2;
          index <= props.current + 2;
          index++
        ) {
          indexes.push(index);
        }
      }

      return (
        <>
          <div class="pagination">
            <ul class="pagination-list">
              {indexes.map((item) => {
                return (
                  <li onClick={() => handleClick(item, pageCount)}>
                    <a
                      class={classnames("pagination-link", {
                        "is-current": props.current === item,
                      })}
                    >
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
            <a
              class={classnames("pagination-previous", {
                "pagination-ellipsis": props.current === 1,
              })}
              onClick={() => handleClick(props.current - 1, pageCount)}
            >
              上一页
            </a>
            <a
              class={classnames("pagination-next", {
                "pagination-ellipsis": props.current === pageCount,
              })}
              onClick={() => handleClick(props.current + 1, pageCount)}
            >
              下一页
            </a>
            <div class="pagination">
              跳转至
              <input
                style={{ width: "60px" }}
                value={jumpPage.value}
                onInput={(event) => onInputChange(event)}
                class="input"
                type="text"
              />
              页
              <a
                class="pagination-next"
                onClick={() => handleClick((jumpPage.value as number), pageCount)}
              >
                GO
              </a>
            </div>
          </div>
        </>
      );
    };
  },
});
