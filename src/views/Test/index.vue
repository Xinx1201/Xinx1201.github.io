<template>
  <div class="flex-row flex-center">
    <el-card shadow="hover">
      <div slot="header" class="flex-column flex-ai-stretch">
        <div class="flex-row">
          <el-input
            v-model="url"
            clearable
            placeholder="请输入websocket"
          ></el-input>
          <el-button class="btn" @click="cleanLog">清空记录</el-button>
          <el-button class="btn" type="primary" @click="initWebSocket"
            >连接websocket</el-button
          >
        </div>
        <div class="flex-row mgt10" v-if="flag">
          <el-input
            v-model="text"
            autosize
            maxlength="999"
            show-word-limit
            type="textarea"
            placeholder="发送内容"
          ></el-input>
          <el-button class="btn" type="primary" @click="websocketsend"
            >发送信息</el-button
          >
        </div>
      </div>
      <div class="chat">
        <div v-for="(item, index) in msg" :key="index">
          {{ item }}
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      url: '', // websocket地址
      text: '', // 发送内容
      flag: false, // 是否可以发送信息
      msg: [],
    };
  },
  mounted() {},
  methods: {
    // 初始化websocket
    initWebSocket() {
      if ('WebSocket' in window) {
        window.websock = new WebSocket(this.url);
        this.msg.push(`开始连接${this.url}`);
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
      this.flag = true;
      this.msg.push(`WebSocket连接成功`);
      if (this.text !== '') {
        this.websocketsend();
      }
    },
    websocketonerror(e) {
      //错误
      this.flag = false;
      this.msg.push(`WebSocket连接发生错误❌`);
    },
    //数据接收
    websocketonmessage(e) {
      if (e) {
        this.msg.push(`接收到信息📧` + e.data);
      }
    },
    //数据发送
    websocketsend() {
      this.msg.push(`发送信息✈️` + this.text);
      window.websock.send(JSON.stringify(this.text));
    },
    //连接关闭
    websocketclose(e) {
      this.flag = false;
      this.msg.push(`连接关闭❌`);
      this.initWebSocket();
    },
    // 清空记录
    cleanLog() {
      this.msg = [];
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  width: 888px;

  .btn {
    margin-left: 10px;
  }

  .chat {
    text-align: left;
  }
}
</style>
