<template>
  <div class="container">
    <div class="calc">
      <div class="select">
        <el-select
          allow-create
          filterable
          default-first-option
          v-model="server"
          placeholder="服务器"
        >
          <el-option
            v-for="item in serverList"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
        <el-select v-model="map" filterable placeholder="地图">
          <el-option-group
            v-for="group in horseMapOptions"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-option-group>
        </el-select>

        <el-select v-model="type" placeholder="马驹类型">
          <el-option
            v-for="item in defaultHorseOptions"
            :key="item"
            :label="item"
            :value="item"
          >
            <span v-html="showKeyWorld(item)"></span>
          </el-option>
        </el-select>
      </div>

      <div class="main">
        <span class="currentTime">{{ currentTime }}</span>
        <span class="symbol">+</span>
        <el-input-number
          v-model="intervalTime"
          :min="0"
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
        <el-button @click="onClickRecord">记录时间</el-button>
      </div>
    </div>
    <div class="history">
      <TableData :tableData="tableData" />
    </div>
  </div>
</template>

<script>
import horseMapOptions from '@/assets/data/horseMap.json';
import TableData from './tableData.vue';
export default {
  name: 'Time',
  components: {
    TableData,
  },
  data() {
    return {
      tableData: [],
      currentTime: '', // 当前时间
      intervalTime: '', // 间隔时间
      endTime: '', // 结束时间
      server: '', // 服务器
      map: '', // 地点
      type: '', // 马类型

      serverList: ['破阵子'], // 服务器列表

      horseMapOptions, // 刷马地图数据
      defaultHorseOptions: ['龙子/麟驹', '绝尘/赤蛇/闪电', '里飞沙', '赤兔'], // 默认马选项

      // 变异马选项
      variationHorseOptions: {
        鲲鹏岛: ['龙子/麟驹(变异)', '绝尘/赤蛇(变异)/闪电', '里飞沙', '赤兔'],
        阴山大草原: ['龙子/麟驹', '绝尘(变异)/赤蛇/闪电', '里飞沙', '赤兔'],
        黑戈壁: ['龙子(变异)/麟驹', '绝尘/赤蛇/闪电(变异)', '里飞沙', '赤兔'],
      },
    };
  },

  watch: {
    intervalTime: {
      handler(val) {
        let currentTs = Math.round(new Date().getTime());
        let ts = this.intervalTime * 60 * 1000; // 间隔时间 换成时间戳
        let endTs = currentTs + ts;
        this.endTime = this.formatTime(endTs);
      },
      immediate: true,
    },

    currentTime: {
      handler(val) {},
    },

    tableData: {
      handler(val) {
        // 存储数据
        window.localStorage.setItem('timeData', JSON.stringify(val));
      },
    },

    // 自动填充类型
    map: {
      handler(val) {
        if (
          this.horseMapOptions
            .find((x) => x.label == '马场')
            .options.some((x) => x.name == val)
        ) {
          this.defaultHorseOptions = this.variationHorseOptions[val];
          this.type = '';
        } else if (
          this.horseMapOptions
            .find((x) => x.label == '小马')
            .options.some((x) => x.name == val)
        ) {
          this.defaultHorseOptions = [
            '龙子/麟驹',
            '绝尘/赤蛇/闪电',
            '里飞沙',
            '赤兔',
          ];
          this.type = '龙子/麟驹';
        } else if (val == '黑龙沼') {
          this.defaultHorseOptions = [
            '龙子/麟驹',
            '绝尘/赤蛇/闪电',
            '里飞沙',
            '赤兔',
          ];
          this.type = '里飞沙';
        } else if (
          this.horseMapOptions
            .find((x) => x.label == '大马')
            .options.some((x) => x.name == val)
        ) {
          this.defaultHorseOptions = [
            '龙子/麟驹',
            '绝尘/赤蛇/闪电',
            '里飞沙',
            '赤兔',
          ];
          this.type = '绝尘/赤蛇/闪电';
        }
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
      this.currentTime = this.formatTime(new Date().getTime());
    }, 1000);

    if (window.localStorage.getItem('timeData')) {
      this.tableData = JSON.parse(window.localStorage.getItem('timeData'));
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    // 记录信息
    onClickRecord() {
      this.tableData.push({
        recordTime: this.currentTime,
        server: this.server, // 服务器
        map: this.map, // 地点
        type: this.type, // 马的种类
        endTime: this.endTime,
      });
    },

    // 变红(变异)
    showKeyWorld(val) {
      if (val.indexOf('(变异)') !== -1 && '(变异)' !== '') {
        return val.replace(
          '(变异)',
          '<font color="#f00">' + '(变异)' + '</font>'
        );
      } else {
        return val;
      }
    },

    formatTime(time) {
      let date = new Date(time);
      let year = date.getFullYear(); // 年
      let month = date.getMonth() + 1; // 月
      let day = date.getDate(); // 日
      let hour = date.getHours(); // 时
      let minutes = date.getMinutes(); // 分
      let seconds = date.getSeconds(); //秒
      // 给一位数的数据前面加 “0”
      if (month >= 1 && month <= 9) {
        month = '0' + month;
      }
      if (day >= 0 && day <= 9) {
        day = '0' + day;
      }
      if (hour >= 0 && hour <= 9) {
        hour = '0' + hour;
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = '0' + minutes;
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = '0' + seconds;
      }

      return (
        year +
        '-' +
        month +
        '-' +
        day +
        ' ' +
        hour +
        ':' +
        minutes +
        ':' +
        seconds
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  .calc {
    height: 150px;
    background-color: #fafafa;
    position: relative;
    .select {
      position: absolute;
      right: 10px;
      top: 10px;
    }

    .main {
      line-height: 150px;
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
    margin-top: 20px;
    height: 74vh;
    width: 100%;
  }
}
</style>
