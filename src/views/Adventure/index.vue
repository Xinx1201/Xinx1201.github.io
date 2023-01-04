<template>
  <div class="flex-column flex-center">
    <div class="operation is-flex flex-as-stretch flex-between">
      <div>
        <el-select
          filterable
          class="school"
          ref="school"
          v-model="school"
          placeholder="请选择门派"
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
        <el-select
          filterable
          class="camp"
          ref="camp"
          v-model="camp"
          placeholder="请选择阵营"
          value-key="id"
        >
          <el-option
            v-for="item in pvps"
            :key="item.id"
            :label="item.camp"
            :value="item"
          >
            <span :style="{ color: item.color }">{{ item.camp }}</span>
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
import pvps from '@/assets/data/pvp.json';
export default {
  name: 'Adventure',
  components: {
    Box,
  },
  data() {
    return {
      schools,
      pvps,
      camp: '恶人谷',
      school: '霸刀',
    };
  },
  watch: {
    school: {
      handler(val) {
        if (val) {
          // 改变选中后的颜色
          this.$refs.school.$el.children[0].children[0].style.color = val.color;
          this.$refs.box.changeColor(val);
        }
      },
    },
    camp: {
      handler(val) {
        if (val) {
          // 改变选中后的颜色
          this.$refs.camp.$el.children[0].children[0].style.color = val.color;
          this.$refs.box.changeCampColor(val);
        }
      },
    },
  },
  mounted() {
    // 默认霸刀的颜色
    this.$refs.school.$el.children[0].children[0].style.color = '#8D90D8';
    // 默认恶人谷的颜色
    this.$refs.camp.$el.children[0].children[0].style.color = 'red';
  },
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
  .camp {
    margin-left: 10px;
  }
}
</style>
