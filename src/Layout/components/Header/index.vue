<template>
  <div>
    <div class="container">
      <el-menu
        router
        :default-active="this.$route.path"
        class="el-menu-demo"
        mode="horizontal"
      >
        <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.path">
          {{ item.navItem }}
        </el-menu-item>
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
      navList: [
        { path: '/Fame', navItem: '楚天社' },
        { path: '/Time', navItem: '抓马时间' },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.container {
  height: 61px;
  line-height: 61px;
}
</style>
