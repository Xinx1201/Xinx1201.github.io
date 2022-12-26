<template>
  <div class="container">
    <el-menu
      router
      mode="horizontal"
      class="el-menu-demo"
      :default-active="this.$route.path"
    >
      <el-menu-item v-for="(item, i) in menu" :key="i" :index="item.path">
        {{ item.navItem }}
      </el-menu-item>
    </el-menu>

    <!-- github角标 -->
    <Icon />
  </div>
</template>

<script>
import menu from '@/router/modules';
import Icon from './icon';
export default {
  name: 'Header',
  components: {
    Icon,
  },
  data() {
    return {};
  },

  computed: {
    menu: {
      get() {
        let navList = [];
        // 获取到每个菜单栏下的每个children
        menu.forEach((menu) => {
          // 每个路由的信息
          menu.children.forEach((item) => {
            navList.push({
              path: item.path,
              navItem: item.meta.title,
            });
          });
        });
        return navList;
      },
    },
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
