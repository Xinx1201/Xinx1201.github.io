<template>
  <div class="container">
    <div class="calc">
      <div class="select">
        <Operation @select="select" />
      </div>
      <div
        v-if="multipleSelection && multipleSelection.length"
        class="deleteAll"
      >
        <el-button @click="multipleDelet">删除</el-button>
      </div>
      <div class="main">
        <span class="currentTime">{{ currentTime }}</span>
        <span class="symbol">+</span>
        <el-input-number
          :min="0"
          v-model="intervalTime"
          placeholder="等待时间"
        ></el-input-number>
        <span class="min">分钟</span>
        <span class="symbol">=</span>
        <template>
          <span v-if="intervalTime" class="endTime">{{ endTime }}</span>
          <span v-else class="currentTime">{{ currentTime }}</span>
        </template>
      </div>

      <div class="record">
        <el-button type="primary" @click="onClickRecord">记录时间</el-button>
      </div>
    </div>
    <div class="history">
      <DataTable :tableData="tableData" @selection="selection" ref="table" />
    </div>
  </div>
</template>

<script>
import Operation from './Operation.vue';
import DataTable from './DataTable.vue';
import { formatTimestamp, randomInt } from '@/utils';
import horseIcon from '@/assets/data/horseIcon.json';
export default {
  name: 'Time',
  components: {
    Operation,
    DataTable,
  },
  data() {
    return {
      form: {},
      tableData: [],
      currentTime: '', // 当前时间
      intervalTime: '', // 间隔时间
      endTime: '', // 结束时间

      multipleSelection: [], // 多选数据
    };
  },

  watch: {
    intervalTime: {
      handler(val) {
        let currentTs = Math.round(new Date().getTime());
        let ts = this.intervalTime * 60 * 1000; // 间隔时间 换成时间戳
        let endTs = currentTs + ts;
        this.endTime = formatTimestamp(endTs);
      },
      immediate: true,
    },

    // 当前时间
    currentTime: {
      handler(val) {
        let source = JSON.parse(JSON.stringify(this.tableData));
        // console.log(val);
        let currentTs = Math.round(new Date() / 1000);
        // 根据当前时间 - 刷马时间(提前10分钟【准备】刷马提醒)
        source.forEach((x) => {
          let ts = Math.round(new Date(x.endTime) / 1000);
          let min = (ts - currentTs) / 60;
          let horse = x.type.split('/');
          let length = x.type.split('/').length;

          // 未超时的情况下 10/5 分钟提醒
          if (min == 10) {
            new Notification('准备刷马', {
              body: `【${x.server}】的【${x.map}】将于10分钟后开始刷->${x.type}`,
              icon: `${horseIcon[horse[randomInt(0, length - 1)]]}`,
            });
          } else if (min == 5) {
            new Notification('已经刷马', {
              body: `【${x.server}】的【${x.map}】将于5分钟后开始刷->${x.type}`,
              icon: `${horseIcon[horse[randomInt(0, length - 1)]]}`,
            });
          }

          // 超时的情况下 5分钟添加删除线 10分钟删除该条信息
          let overTime = (currentTs - ts) / 60;
          if (overTime == 5) {
            source.find((item) => item == x).overTime = 5;
            this.tableData = source;
          } else if (overTime >= 10) {
            // 超过10分钟 则删除本条信息
            let index = source.findIndex((item) => item == x);
            source.splice(index, 1);
            this.tableData = source;
          }
        });
      },
    },

    tableData: {
      handler(val) {
        // 存储数据
        window.localStorage.setItem('timeData', JSON.stringify(val));
      },
    },
  },

  created() {
    if (window.Notification) {
      // 浏览器通知--window.Notification
      if (Notification.permission == 'granted') {
        console.log('允许通知');
      } else if (Notification.permission != 'denied') {
        console.log('需要通知权限');
        Notification.requestPermission((permission) => {});
      }
    } else {
      console.error('浏览器不支持Notification');
    }
  },

  mounted() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.currentTime = formatTimestamp(new Date().getTime());
    }, 1000);

    if (window.localStorage.getItem('timeData')) {
      this.tableData = JSON.parse(window.localStorage.getItem('timeData'));
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    select(val) {
      this.form = val;
    },
    // 选择数据
    selection(val) {
      this.multipleSelection = val;
    },
    // 删除全部
    multipleDelet() {
      this.$confirm('此操作将删除信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.multipleSelection.forEach((item) => {
            let index = this.tableData.findIndex((x) => x == item);
            this.tableData.splice(index, 1);
          });
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
    // 记录信息
    onClickRecord() {
      // 重置记录分钟数
      this.intervalTime = '';
      // 添加信息
      this.tableData.push({
        recordTime: this.currentTime,
        server: this.form.server, // 服务器
        map: this.form.map, // 地点
        type: this.form.type, // 马的种类
        endTime: this.endTime,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  .calc {
    height: 100px;
    background-color: #fafafa;
    position: relative;
    .select {
      position: absolute;
      right: 0;
      top: -45px;
    }

    .deleteAll {
      position: absolute;
      left: 0;
      bottom: 0;
    }

    .main {
      line-height: 100px;
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      .currentTime,
      .endTime {
        width: 200px;
      }

      .min {
        width: 50px;
        font-size: 20px;
      }

      .symbol {
        font-size: 20px;
        font-weight: bold;
        margin: 0 20px;
      }
    }

    .record {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
  .history {
    height: 100%;
  }
}
</style>
