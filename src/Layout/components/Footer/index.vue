<template>
  <div class="container">
    <span>
      <el-link :underline="false" @click="onClickAuthor">{{ author }}</el-link>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  components: {},
  data() {
    return {
      author: '九娄的灵蛇',
    };
  },
  methods: {
    onClickAuthor() {
      window.open(
        'https://github.com/xin-code/JX3_MY_DATA/tree/master/MY_TeamMon/zhcn'
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 50px;
  line-height: 50px;
  background-color: rgba(238, 238, 238, 0.5);
}
</style>
