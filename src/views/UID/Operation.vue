<template>
  <el-form class="flex-row flex-wrap" :inline="true" :model="form">
    <div class="flex-auto" />
    <el-form-item>
      <el-checkbox
        v-model="form.onlySeeVariation"
        @change="onSelectChange('variation')"
        >仅看变异马驹</el-checkbox
      >
    </el-form-item>
    <el-form-item>
      <el-select
        filterable
        clearable
        v-model="form.uid"
        @change="onSelectChange('uid')"
        placeholder="请选择马驹/UID"
      >
        <el-option
          v-for="item in uidOptions.filter((x) => x.children.length)"
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
  onlySeeVariation: false, // 是否仅看变异马驹
  uid: '', // 马驹种类/UID
});
export default {
  name: 'UIDSearch',
  data() {
    return {
      uidOptions, // uid筛选项
      form: genNew(),
    };
  },

  mounted() {
    this.onSelectChange();
  },

  methods: {
    onSelectChange(type) {
      if (type == 'variation') {
        this.form.uid = '';
        this.$emit('select', this.form);
      } else {
        this.form.onlySeeVariation = false;
        this.$emit('select', this.form);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
