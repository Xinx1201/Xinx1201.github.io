<template>
  <div class="Main">
    <section>
      <transition name="fade-transform" mode="out-in">
        <div class="container">
          <router-view />
        </div>
      </transition>
    </section>
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
  min-height: calc(100vh - 111px);
  width: 100%;
  position: relative;
  overflow: hidden;

  .container {
    padding: 20px;
  }
}
</style>
