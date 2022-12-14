<template>
  <div>测试数据</div>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {};
  },
  mounted() {
    this.initWebSocket();
  },
  methods: {
    // 初始化websocket
    initWebSocket() {
      if ('WebSocket' in window) {
        window.websock = new WebSocket('wss://socket.nicemoe.cn');
        window.websock.onopen = this.websocketonopen;
        window.websock.onerror = this.websocketonerror;
        window.websock.onsend = this.websocketsend;
        window.websock.onmessage = this.websocketonmessage;
        window.websock.onclose = this.websocketclose;
      } else {
        console.log('当前浏览器 Not support websocket');
      }
    },

    websocketonopen() {
      console.log(window.websock);
      console.log('WebSocket连接成功');
      this.websocketsend();
    },
    websocketonerror(e) {
      //错误
      console.log(e);
      console.log('WebSocket连接发生错误');
    },
    //数据接收
    websocketonmessage(e) {
      if (e) {
        console.log(e.data);
      }
    },
    //数据发送
    websocketsend() {
      let data = 'ping';
      console.log(data);
      window.websock.send(data);
    },
    //连接关闭
    websocketclose(e) {
      console.log('连接关闭');
      this.initWebSocket();
    },
  },
};
</script>

<style lang="scss" scoped></style>
