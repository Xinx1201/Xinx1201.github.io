<template>
  <el-form class="flex-row flex-wrap" :inline="true" :model="form">
    <div class="flex-auto" />
    <el-form-item>
      <el-select
        filterable
        clearable
        v-model="form.uid"
        @change="onSelectChange"
        placeholder="请选择马驹/UID"
      >
        <el-option
          v-for="item in uidOptions"
          :key="item.uid"
          :label="item.horse + item.uid"
          :value="item.uid"
        >
          <span style="float: left">{{ item.horse }}</span>
          <span style="float: right; color: #409eff; font-size: 10px">{{
            item.uid
          }}</span>
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import { filterKeyWord } from '@/utils';
import uidOptions from '@/assets/data/uid.json';
const genNew = () => ({
  uid: '', // 马驹种类/UID
});
export default {
  name: 'UIDSearch',
  data() {
    return {
      uidOptions,  // uid筛选项
      form: genNew(),
    };
  },

  mounted() {
    this.onSelectChange();
  },

  methods: {
    onSelectChange() {
      this.$emit('select', this.form);
    },
  },
};
</script>

<style lang="scss" scoped></style>
