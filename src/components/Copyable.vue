<!-- 需要有key，否则clipboard指令不会重置为新的值，在表格查询翻页时元素会被重用 -->
<template>
  <span
    class="copyable"
    :key="value"
    v-clipboard="value"
    v-clipboard:success="clipboardSuccessHandler"
    v-clipboard:error="clipboardErrorHandler"
  >
    <slot>
      {{ value }}
    </slot>
  </span>
</template>

<script>
import Clipboard from 'v-clipboard';
import Vue from 'vue';
Vue.use(Clipboard);
export default {
  props: {
    value: {
      type: [String, Number],
      default: () => null,
    },
  },
  methods: {
    clipboardSuccessHandler({ value, event }) {
      this.$dialog.toast({
        message: '已复制到剪贴板',
        type: this.$dialog.SUCCESS,
      });
    },
    clipboardErrorHandler({ value, event }) {
      this.$dialog.toast({
        message: '复制失败，请长按绑定码手动复制',
        type: this.$dialog.ERROR,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.copyable {
  cursor: pointer;
}
</style>
