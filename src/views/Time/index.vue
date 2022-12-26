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
        <span
          v-if="!isChangeCurrentTime"
          class="currentTime"
          @dblclick="onClickEdit"
          >{{ currentTime }}</span
        >
        <template v-else>
          <span @dblclick="onClickEdit" class="customTime">{{
            currentTime.split(' ')[0]
          }}</span>
          <el-time-picker
            v-model="customTime"
            value-format="HH:mm:ss"
            placeholder="任意时间点"
          >
          </el-time-picker>
        </template>
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

      <div class="notify">
        <el-tooltip
          class="item"
          effect="dark"
          content="仅为当前页面时,可弹窗提示"
          placement="top-start"
        >
          <el-checkbox
            @change="changeNotify"
            v-model="notify"
            :disabled="!notifyPermission"
            >通知</el-checkbox
          >
        </el-tooltip>
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
import dayjs from 'dayjs';
import Operation from './Operation.vue';
import DataTable from './DataTable.vue';
import { dateToString, randomInt } from '@/utils';
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

      customTime: '', // 自定义开始时间
      customcurrentTime: '', // 自定义开始时间
      isChangeCurrentTime: false, // 是否改变现在的时间
      notify: false, // 默认不允许通知
      notifyPermission: null, // 默认为允许权限

      multipleSelection: [], // 多选数据
    };
  },

  watch: {
    customTime: {
      handler(val) {
        this.customcurrentTime = this.currentTime.split(' ')[0] + ' ' + val;
      },
    },
    intervalTime: {
      handler(val) {
        let currentTs = !this.isChangeCurrentTime
          ? dayjs().valueOf()
          : dayjs(this.customcurrentTime).valueOf();
        let ts = this.intervalTime * 60 * 1000; // 间隔时间 换成时间戳
        let endTs = currentTs + ts;
        this.endTime = dateToString(endTs, 'datetime');
      },
      immediate: true,
    },

    // 当前时间
    currentTime: {
      handler(val) {
        let source = JSON.parse(JSON.stringify(this.tableData));
        let currentTs = dayjs().valueOf();
        let fiveMinutes = 300;
        let tenMinutes = 600;
        source.forEach((x) => {
          let ts = dayjs(x.endTime).valueOf();

          // 根据当前时间 - 刷马时间(提前10分钟【准备】刷马提醒)
          let min = dayjs(ts).diff(currentTs, 'second');
          let horse = x.type.split('/');
          let length = x.type.split('/').length;
          // 未超时的情况下 10/5 分钟提醒
          // 在允许通知的情况下进行通知
          if (this.notify) {
            if (min == tenMinutes) {
              new Notification('准备刷马', {
                body: `【${x.server}】的【${x.map}】将于10分钟后开始刷->${x.type}`,
                icon: `${horseIcon[horse[randomInt(0, length - 1)]]}`,
              });
            } else if (min == fiveMinutes) {
              new Notification('已经刷马', {
                body: `【${x.server}】的【${x.map}】将于5分钟后开始刷->${x.type}`,
                icon: `${horseIcon[horse[randomInt(0, length - 1)]]}`,
              });
            }
          }

          // 超时的情况下 5分钟添加删除线 10分钟删除该条信息
          let overTime = dayjs(currentTs).diff(ts, 'second');
          if (overTime == fiveMinutes) {
            source.find((item) => item == x).overTime = 5;
            this.tableData = source;
          } else if (overTime >= tenMinutes) {
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
    // 赋值当前时间
    this.currentTime = dateToString(dayjs().valueOf(), 'datetime');
  },

  mounted() {
    this.checkNotifyPermission();
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.currentTime = dateToString(dayjs().valueOf(), 'datetime');
    }, 1000);

    // 获取配置
    if (window.localStorage.getItem('notify')) {
      this.notify = JSON.parse(window.localStorage.getItem('notify'));
    }
    if (window.localStorage.getItem('notifyPermission')) {
      this.notifyPermission = JSON.parse(
        window.localStorage.getItem('notifyPermission')
      );
    }
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
    onClickEdit() {
      this.isChangeCurrentTime = !this.isChangeCurrentTime;
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
        recordTime: !this.isChangeCurrentTime
          ? this.currentTime
          : this.customcurrentTime,
        server: this.form.server, // 服务器
        map: this.form.map, // 地点
        type: this.form.type, // 马的种类
        endTime: this.endTime,
      });
      this.isChangeCurrentTime = false;
    },

    changeNotify() {
      window.localStorage.setItem('notify', this.notify);
    },

    // 通知权限
    checkNotifyPermission() {
      if (window.Notification) {
        // 浏览器通知--window.Notification
        if (Notification.permission == 'granted') {
          console.log('允许通知');
          // 记录到本地当前浏览器的通知权限
          this.notifyPermission = true;
          window.localStorage.setItem('notifyPermission', true);
        } else if (Notification.permission != 'denied') {
          console.log('需要通知权限');
          Notification.requestPermission((permission) => {
            console.log(permission);
            if (permission == 'denied') {
              // 记录到本地当前浏览器的通知权限
              this.notifyPermission = false;
              window.localStorage.setItem('notifyPermission', false);
            } else {
              // 如果选择的为允许 则自动勾选通知权限
              this.notify = true;
              window.localStorage.setItem('notify', true);
              this.notifyPermission = true;
              window.localStorage.setItem('notifyPermission', true);
            }
          });
        } else if (Notification.permission == 'denied') {
          // 如果当前权限都为否，都禁止
          this.notify = false;
          window.localStorage.setItem('notify', false);
          this.notifyPermission = false;
          window.localStorage.setItem('notifyPermission', false);
        }
      } else {
        console.error('浏览器不支持Notification');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/style/Time.scss';
</style>
