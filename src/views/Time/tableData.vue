<template>
  <el-table :data="tableData" stripe style="width: 100%; height: 100%">
    <el-table-column prop="recordTime" label="记录时间" align="center">
    </el-table-column>
    <el-table-column prop="server" label="服务器" align="center">
    </el-table-column>
    <el-table-column prop="map" label="地点" align="center"> </el-table-column>
    <el-table-column prop="type" label="类型" align="center">
      <template slot-scope="scope">
        <span v-html="showKeyWorld(scope.row.type)"></span>
      </template>
    </el-table-column>
    <el-table-column prop="endTime" label="刷马时间" align="center">
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-popconfirm
          confirm-button-text="好的"
          cancel-button-text="不用了"
          icon="el-icon-info"
          icon-color="red"
          title="确定删除该条刷马信息？"
          @confirm="onDeletRecord(scope.row)"
        >
          <el-button slot="reference" type="danger">删除</el-button>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'HorseTableData',
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    // 删除
    onDeletRecord(row) {
      let index = this.tableData.findIndex((x) => x == row);
      this.tableData.splice(index, 1);
    },
    // 变红(变异)
    showKeyWorld(val) {
      if (val.indexOf('(变异)') !== -1 && '(变异)' !== '') {
        return val.replace(
          '(变异)',
          '<font color="#f00">' + '(变异)' + '</font>'
        );
      } else {
        return val;
      }
    },
  },
};
</script>

<style></style>
