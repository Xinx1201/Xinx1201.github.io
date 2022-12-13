<template>
  <div>
    <div class="container">
      <el-menu
        router
        :default-active="this.$route.path"
        class="el-menu-demo"
        mode="horizontal"
      >
        <el-menu-item v-for="(item, i) in menu" :key="i" :index="item.path">
          {{ item.navItem }}
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import menu from '@/router/modules';
export default {
  name: 'Header',
  components: {},
  data() {
    return {};
  },

  computed: {
    menu: {
      get() {
        let navList = [];
        menu[0].children.forEach((item) => {
          navList.push({
            path: item.path,
            navItem: item.meta.title,
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
