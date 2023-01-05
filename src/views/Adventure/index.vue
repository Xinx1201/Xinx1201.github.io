<template>
  <div class="adventure flex-column flex-center">
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

        <el-input
          class="name mgl10"
          v-model="name"
          placeholder="请输入角色名"
        ></el-input>
        <el-select
          class="mgl10"
          filterable
          v-model="server"
          placeholder="请选择服务器"
        >
          <el-option
            v-for="item in servers"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
      <el-switch
        v-if="isRefresh"
        class="mgt10"
        v-model="type"
        :active-color="school.color"
        inactive-color="rgba(165,11,11,0.8)"
        active-text="角标"
        inactive-text="对勾"
      >
      </el-switch>
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
import servers from '@/assets/data/server.json';
import pvps from '@/assets/data/pvp.json';
export default {
  name: 'Adventure',
  components: {
    Box,
  },
  data() {
    return {
      servers,
      schools,
      pvps,
      type: true, // true为角标
      name: '', // 角色名
      server: '', // 服务器
      camp: '恶人谷',
      school: {
        id: '23',
        school: '霸刀',
        color: '#8D90D8',
        icon: 'https://img.jx3box.com/image/school/20.png',
      },
      isRefresh: true,
    };
  },
  watch: {
    school: {
      handler(val) {
        if (val) {
          this.isRefresh = false;
          // 改变选中后的颜色
          this.$refs.school.$el.children[0].children[0].style.color = val.color;
          this.$refs.box.changeColor(val);
          this.$nextTick(() => {
            this.isRefresh = true;
          });
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
    type: {
      handler(val) {
        // true 角标 false 对勾
        // 改变完成表现形式
        this.$refs.box.changeShowType(val);
      },
    },
    name: {
      handler(val) {
        this.$refs.box.getName(val);
      },
    },
    server: {
      handler(val) {
        this.$refs.box.getServer(val);
      },
    },
  },
  mounted() {
    // 默认霸刀的颜色
    this.$refs.school.$el.children[0].children[0].style.color = '#8D90D8';
    // 默认恶人谷的颜色
    this.$refs.camp.$el.children[0].children[0].style.color = '#A01E1E';
  },
  methods: {
    onClickCheck(type) {
      this.$refs.box.check(type);
    },
  },
};
</script>

<style lang="scss" scoped>
.adventure {
  min-width: 1600px;
}
.operation {
  margin-bottom: 10px;
  .camp {
    margin-left: 10px;
  }

  .name {
    width: 217px;
  }

  .el-switch {
    align-items: center;
    justify-content: center;
  }
}
</style>
