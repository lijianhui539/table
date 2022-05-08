import { TableSort, SORT_TYPE_LIST } from "../table/const"
import { ref, computed, ComputedRef, Ref } from 'vue';
import { ColumnType } from "../table/types"
import myBus from '@src/bus';
export function useTableHead(columns: ColumnType[]) {
    let sortListIndex = ref(0)
    let fieldKey = ref('')
    let sortType: ComputedRef<TableSort> = computed(() => {
        return SORT_TYPE_LIST[sortListIndex.value]
    })
    let columnsRenderList: ComputedRef<ColumnType[]> = computed(() => {
        return columns.map(item => {
            // 恢复默认状态
            item.sort = TableSort.Disable

            // 点击排序传入点击的字段key 设置对应字段的排序类型
            if (fieldKey && item.key === fieldKey.value) {
                item.sort = sortType.value
            }
            return item
        })
    })

    let onSort = (val: string) => {

        // 点击不同字段  sortListIndex 恢复0 排序恢复默认值 
        if (val !== fieldKey.value) {
            sortListIndex.value = 0
        }

        fieldKey.value = val
        if (sortListIndex.value === 2) {
            sortListIndex.value = 0
            myBus.emit('table-head-sort', { fieldKey, sortType })
            return
        }
        sortListIndex.value++
        myBus.emit('table-head-sort', { fieldKey, sortType })
    }

    return {
        onSort,
        columnsRenderList
    }
}