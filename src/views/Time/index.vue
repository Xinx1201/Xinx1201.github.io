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
            v-for="group in mapOptinos"
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
            v-for="item in typeOptions"
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
          v-model="time"
          :min="0"
          placeholder="等待时间"
        ></el-input-number>
        <span class="min">分钟</span>
        <span class="symbol">=</span>
        <template>
          <span v-if="time" class="endTime">{{ end }}</span>
          <span v-else class="currentTime">{{ currentTime }}</span>
        </template>
      </div>

      <div class="record">
        <el-button @click="onClickRecord">记录时间</el-button>
      </div>
    </div>
    <div class="history">
      <el-table :data="tableData" stripe style="width: 100%; height: 100%">
        <el-table-column prop="originTime" label="记录时间" align="center">
        </el-table-column>
        <el-table-column prop="server" label="服务器" align="center">
        </el-table-column>
        <el-table-column prop="map" label="地点" align="center">
        </el-table-column>
        <el-table-column prop="type" label="类型" align="center">
          <template slot-scope="scope">
            <span v-html="showKeyWorld(scope.row.type)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="刷马时间" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-popconfirm
              confirm-button-text="好的"
              cancel-button-text="不用了"
              icon="el-icon-info"
              icon-color="red"
              title="确定删除该条刷马信息？"
              @confirm="onDeletRecord(scope.row)"
            >
              <el-button slot="reference" type="danger">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Time',
  data() {
    return {
      tableData: [],
      currentTime: '', // 当前时间
      time: '',
      end: '',
      server: '', // 服务器
      map: '', // 地点
      type: '', // 类型

      serverList: ['破阵子'],

      mapOptinos: [
        {
          label: '马场',
          options: [
            {
              name: '黑戈壁',
            },
            {
              name: '鲲鹏岛',
            },
            {
              name: '阴山大草原',
            },
          ],
        },
        {
          label: '大马',
          options: [
            {
              name: '昆仑',
            },
            {
              name: '南屏山',
            },
            {
              name: '白龙口',
            },
            {
              name: '无量山',
            },
            {
              name: '黑龙沼',
            },
          ],
        },
        {
          label: '小马',
          options: [
            {
              name: '金水镇',
            },
            {
              name: '巴陵县',
            },
            {
              name: '龙门荒漠',
            },
          ],
        },
      ],
      typeOptions: ['龙子/麟驹', '绝尘/赤蛇/闪电', '里飞沙', '赤兔'],
      variationOptions: {
        鲲鹏岛: ['龙子/麟驹(变异)', '绝尘/赤蛇(变异)/闪电', '里飞沙', '赤兔'],
        阴山大草原: ['龙子/麟驹', '绝尘(变异)/赤蛇/闪电', '里飞沙', '赤兔'],
        黑戈壁: ['龙子(变异)/麟驹', '绝尘/赤蛇/闪电(变异)', '里飞沙', '赤兔'],
      },
    };
  },

  watch: {
    time: {
      handler(val) {
        let currentTs = Math.round(new Date().getTime());
        let ts = this.time * 60 * 1000;
        let endTs = currentTs + ts;
        this.end = this.getCurrentTime(endTs);
      },
      immediate: true,
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
          this.mapOptinos
            .find((x) => x.label == '马场')
            .options.some((x) => x.name == val)
        ) {
          this.typeOptions = this.variationOptions[val];
          this.type = '';
        } else if (
          this.mapOptinos
            .find((x) => x.label == '小马')
            .options.some((x) => x.name == val)
        ) {
          this.typeOptions = ['龙子/麟驹', '绝尘/赤蛇/闪电', '里飞沙', '赤兔'];
          this.type = '龙子/麟驹';
        } else if (val == '黑龙沼') {
          this.typeOptions = ['龙子/麟驹', '绝尘/赤蛇/闪电', '里飞沙', '赤兔'];
          this.type = '里飞沙';
        } else if (
          this.mapOptinos
            .find((x) => x.label == '大马')
            .options.some((x) => x.name == val)
        ) {
          this.typeOptions = ['龙子/麟驹', '绝尘/赤蛇/闪电', '里飞沙', '赤兔'];
          this.type = '绝尘/赤蛇/闪电';
        }
      },
    },
  },

  mounted() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.currentTime = this.getCurrentTime(new Date().getTime());
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
        originTime: this.currentTime,
        server: this.server, // 服务器
        map: this.map, // 地点
        type: this.type, // 马的种类
        endTime: this.end,
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

    // 删除
    onDeletRecord(row) {
      let index = this.tableData.findIndex((x) => x == row);
      this.tableData.splice(index, 1);
    },
    getCurrentTime(time) {
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
