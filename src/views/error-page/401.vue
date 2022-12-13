<template>
  <div class="container">
    <div style="font-size: 80px">401</div>
    <div style="font-size: 60px">无访问权限</div>
    <img src="~@/assets/img/logo.png" class="logo" />
    <router-link to="/">
      <el-button>返回首页</el-button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.container {
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .logo {
    margin: 30px 0px;
  }
}
</style>
