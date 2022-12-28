<template>
  <el-table :data="data" border stripe style="width: 100%">
    <el-table-column align="center" prop="horse" label="成马">
      <template slot-scope="scope">
        <copyable :value="scope.row.horse" />
        {{ scope.row['双骑'] ? `(${scope.row['双骑']})` : '' }}
      </template>
    </el-table-column>
    <el-table-column align="center" prop="uid" label="UID">
      <template slot-scope="scope">
        <copyable :value="scope.row.uid" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="属性">
      <template slot-scope="scope">
        <span
          v-html="
            $options.filters.filterKeyWord(scope.row.attr.join(' / '), '劲足')
          "
        ></span>
      </template>
    </el-table-column>
    <el-table-column align="center" prop="移速" label="移速" width="90" />
    <el-table-column
      align="center"
      prop="马术气力"
      label="马术气力"
      width="90"
    />
    <el-table-column
      align="center"
      prop="恢复增加"
      label="恢复增加"
      width="90"
    />
    <el-table-column
      align="center"
      prop="消耗降低"
      label="消耗降低"
      width="90"
    />
    <el-table-column
      align="center"
      prop="恢复速度"
      label="恢复速度"
      width="90"
    />
    <el-table-column align="center" prop="抗摔" label="抗摔" width="90" />
  </el-table>
</template>

<script>
import { filterKeyWord } from '@/utils';
export default {
  naem: 'HouseDetail',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {},
};
</script>

<style></style>
