<template>
  <div class="operation">
    <el-select
      allow-create
      filterable
      default-first-option
      @change="onSelectChange"
      v-model="form.server"
      placeholder="服务器"
    >
      <el-option
        v-for="item in serverList"
        :key="item"
        :label="item"
        :value="item"
      >
      </el-option>
    </el-select>
    <el-select
      v-model="form.map"
      @change="onSelectChange"
      filterable
      placeholder="地图"
    >
      <el-option-group
        v-for="group in horseMapOptions"
        :key="group.label"
        :label="group.label"
      >
        <el-option
          v-for="item in group.options"
          :key="item.name"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-option-group>
    </el-select>

    <el-select
      v-model="form.type"
      @change="onSelectChange"
      placeholder="马驹类型"
    >
      <el-option
        v-for="item in defaultHorseOptions"
        :key="item"
        :label="item"
        :value="item"
      >
        <span v-html="$options.filters.filterKeyWord(item)"></span>
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { filterKeyWord } from '@/utils';
import horseMapOptions from '@/assets/data/horseMap.json';
import serverList from '@/assets/data/server.json';
const genNew = () => ({
  server: '破阵子', // 服务器
  map: '', // 地点
  type: '', // 马的种类
});
export default {
  name: 'TimeOperation',
  data() {
    return {
      form: genNew(),

      serverList, // 服务器列表
      horseMapOptions, // 刷马地图数据
      defaultHorseOptions: ['龙子/麟驹', '绝尘/赤蛇/闪电', '里飞沙', '赤兔'], // 默认马选项

      // 变异马选项
      variationHorseOptions: {
        鲲鹏岛: ['龙子/麟驹(变异)', '绝尘/赤蛇(变异)/闪电', '里飞沙', '赤兔'],
        阴山大草原: ['龙子/麟驹', '绝尘(变异)/赤蛇/闪电', '里飞沙', '赤兔'],
        黑戈壁: ['龙子(变异)/麟驹', '绝尘/赤蛇/闪电(变异)', '里飞沙', '赤兔'],
      },
    };
  },

  watch: {
    // 自动填充类型
    'form.map': {
      handler(val) {
        if (
          this.horseMapOptions
            .find((x) => x.label == '马场')
            .options.some((x) => x.name == val)
        ) {
          this.defaultHorseOptions = this.variationHorseOptions[val];
          this.form.type = '';
        } else if (
          this.horseMapOptions
            .find((x) => x.label == '小马')
            .options.some((x) => x.name == val)
        ) {
          this.defaultHorseOptions = [
            '龙子/麟驹',
            '绝尘/赤蛇/闪电',
            '里飞沙',
            '赤兔',
          ];
          this.form.type = '龙子/麟驹';
        } else if (val == '黑龙沼') {
          this.defaultHorseOptions = [
            '龙子/麟驹',
            '绝尘/赤蛇/闪电',
            '里飞沙',
            '赤兔',
          ];
          this.form.type = '里飞沙';
        } else if (
          this.horseMapOptions
            .find((x) => x.label == '大马')
            .options.some((x) => x.name == val)
        ) {
          this.defaultHorseOptions = [
            '龙子/麟驹',
            '绝尘/赤蛇/闪电',
            '里飞沙',
            '赤兔',
          ];
          this.form.type = '绝尘/赤蛇/闪电';
        }
      },
    },
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

<style lang="scss" scoped>
.operation {
  .el-select {
    margin-left: 10px;
  }
}
</style>
