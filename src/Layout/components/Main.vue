<template>
  <div class="Main">
    <transition name="fade-transform" mode="out-in">
      <div class="container">
        <router-view />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.Main {
  min-height: calc(100vh - 112px);
  width: 100%;
  position: relative;
  overflow: hidden;

  .container {
    min-height: calc(100vh - 192px);
    padding: 20px;
  }
}
</style>
