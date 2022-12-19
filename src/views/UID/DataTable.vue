<template>
  <el-table
    :data="data"
    border
    stripe
    style="width: 100%"
    @row-click="rowClick"
    height="77vh"
    :span-method="objectSpanMethod"
    ref="table"
  >
    <el-table-column align="center" prop="horse" label="马驹" width="180">
    </el-table-column>
    <el-table-column type="expand">
      <template slot-scope="scope">
        <Detail :data="scope.row.children" />
      </template>
    </el-table-column>
    <el-table-column align="center" prop="uid" label="UID" width="180">
      <template slot-scope="scope">
        <copyable :value="scope.row.uid" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="劲足属性">
      <template slot-scope="scope">
        <span
          v-html="
            $options.filters.filterKeyWord(
              simpleInfo(scope.row.children),
              '劲足'
            )
          "
        ></span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import Detail from './Detail.vue';
import { filterKeyWord } from '@/utils';
export default {
  name: 'UIDDataTable',
  components: {
    Detail,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  computed: {},
  methods: {
    // 展示精简信息
    simpleInfo(row) {
      let info = '';
      row.forEach((x, index) => {
        if (x.attr.find((x) => x.includes('劲足'))) {
          info += x.uid + ' ';
          info += x.horse + ' ';
          info += `【${x.attr}】${row.length - 1 == index ? '' : ' '}\n`;
        }
      });
      return info;
    },
    // 点击行 展示详情信息
    rowClick(row, column, event) {
      this.$refs.table.toggleRowExpansion(row);
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        let spanArr = this.getSpanArr(this.data, 'horse');
        const _row = spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    // 处理合并行的数据
    getSpanArr(data, spanKey) {
      let that = this;
      let spanArr = [];
      let pos = '';
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          spanArr.push(1);
          pos = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i][spanKey] === data[i - 1][spanKey]) {
            spanArr[pos] += 1;
            spanArr.push(0);
          } else {
            spanArr.push(1);
            pos = i;
          }
        }
      }
      return spanArr;
    },
  },
};
</script>

<style>
.el-table .cell {
  white-space: pre-wrap; /*这是重点。文本换行*/
}
</style>
