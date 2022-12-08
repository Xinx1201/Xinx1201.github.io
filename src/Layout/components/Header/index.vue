<template>
  <div>
    <div class="container">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">处理中心</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  components: {},
  data() {
    return {
      activeIndex: '1',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 61px;
  line-height: 61px;
}
</style>
