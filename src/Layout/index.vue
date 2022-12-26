<template>
  <div class="App">
    <Header />
    <Main />
    <Footer v-if="false" />
  </div>
</template>

<script>
import { Header, Main, Footer } from './components';
import ResizeMixin from './mixin/ResizeHandler';
export default {
  name: 'Layout',
  components: {
    Header,
    Main,
    Footer,
  },
  mixins: [ResizeMixin],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
