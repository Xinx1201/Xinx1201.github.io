<template>
  <div class="container">
    <span @click="onClickChat">{{ chat }}</span>
  </div>
</template>

<script>
import * as jx3Api from '@/api/jx3';
export default {
  name: 'Footer',
  components: {},
  data() {
    return {
      chat: '',
      timer: null, // 定时器
    };
  },
  created() {
    clearInterval(this.timer);
    this.onClickChat();
  },
  mounted() {
    clearInterval(this.timer);
    // 随机骚话 30s一次
    this.timer = setInterval(() => {
      this.onClickChat();
    }, 30 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    async onClickChat() {
      const res = await jx3Api.chat();
      this.chat = res.text;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 50px;
  font-size: 13px;
  line-height: 50px;
  background-color: rgba(238, 238, 238, 0.5);
}
</style>
