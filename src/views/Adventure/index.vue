<template>
  <div class="flex-column flex-center">
    <div class="operation is-flex flex-as-stretch flex-between">
      <div>
        <el-select
          filterable
          v-model="school"
          placeholder="请选择"
          value-key="school"
        >
          <el-option
            v-for="item in schools"
            :key="item.school"
            :label="item.school"
            :value="item"
          >
            <span :style="{ color: item.color }">{{ item.school }}</span>
          </el-option>
        </el-select>
      </div>
      <div>
        <el-button @click="onClickCheck('all')">一键完成</el-button>
        <el-button @click="onClickCheck('normal')">一键勾选普通奇遇</el-button>
        <el-button @click="onClickCheck('perfect')">一键勾选绝世奇遇</el-button>
      </div>
    </div>
    <Box ref="box" />
  </div>
</template>

<script>
import Box from './Box.vue';
import schools from '@/assets/data/school.json';
export default {
  name: 'Adventure',
  components: {
    Box,
  },
  data() {
    return {
      schools,
      school: '江湖',
    };
  },
  watch: {
    school: {
      handler(val) {
        if (val) {
          this.$refs.box.changeColor(val);
        }
      },
    },
  },
  mounted() {},
  methods: {
    onClickCheck(type) {
      this.$refs.box.check(type);
    },
  },
};
</script>

<style lang="scss" scoped>
.operation {
  margin-bottom: 10px;
}
</style>
