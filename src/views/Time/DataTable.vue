<template>
  <div class="table">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%; height: 100%"
      height="73vh"
      @selection-change="handleSelectionChange"
      :cell-class-name="delLine"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="recordTime" label="记录时间" align="center">
      </el-table-column>
      <el-table-column label="区服" align="center">
        <template slot-scope="scope">
          <span>{{
            serverList
              .map((x) => x.options)
              .flat()
              .find((x) => x.server == scope.row.server).zone
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="server" label="服务器" align="center">
      </el-table-column>
      <el-table-column prop="map" label="地点" align="center">
      </el-table-column>
      <el-table-column prop="type" label="类型" align="center">
        <template slot-scope="scope">
          <span v-html="$options.filters.filterKeyWord(scope.row.type)"></span>
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="刷马时间" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.overTime"
            >{{ scope.row.endTime }}<i class="danger">(已刷马)</i></span
          >
          <span v-else>{{ scope.row.endTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" class="mgr10" @click="copy(scope.row)"
            >复制</el-button
          >
          <el-popconfirm
            confirm-button-text="好的"
            cancel-button-text="不用了"
            icon="el-icon-info"
            icon-color="red"
            title="确定删除该条刷马信息？"
            @confirm="onDeletRecord(scope.row)"
          >
            <el-button size="mini" slot="reference" type="danger"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { filterKeyWord } from '@/utils';
import emoticons from '@/assets/data/emoticons.json';
import serverList from '@/assets/data/server.json';
export default {
  name: 'HorseDataTable',
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      emoticons,
      serverList,
      multipleSelection: [],
    };
  },
  methods: {
    // 删除线
    delLine({ row, column, rowIndex, columnIndex }) {
      if (row.overTime == 5) {
        return 'del_line';
      }
    },
    // 批量删除
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit('selection', this.multipleSelection);
    },
    randomInt(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    // 复制
    copy(row) {
      let randomEmoji =
        this.emoticons[this.randomInt(0, this.emoticons.length)];
      let oInput = document.createElement('input');
      // 将想要复制的值
      oInput.value = `【${row.server}】将于${row.endTime.split(' ')[1]}在 ${
        row.map
      } 刷新马驹 ${row.type.split('/').join('\\')} ${randomEmoji}`;
      // 页面底部追加输入框
      document.body.appendChild(oInput);
      // 选中输入框
      oInput.select();
      // 执行浏览器复制命令
      document.execCommand('Copy');
      // 弹出复制成功信息
      this.$message.success('复制成功');
      // 复制后移除输入框
      oInput.remove();
    },
    // 删除
    onDeletRecord(row) {
      let index = this.tableData.findIndex((x) => x == row);
      this.tableData.splice(index, 1);
    },
  },
};
</script>

<style lang="scss">
.del_line {
  &:after {
    content: no-open-quote;
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
}
</style>

<style lang="scss" scoped>
.danger {
  font-style: normal;
  margin-left: 5px;
  color: red;
}
</style>
