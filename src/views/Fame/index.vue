<template>
  <div class="fame-box">
    <div class="left">
      <!-- 左侧为时间线 -->
      <el-card>
        <div slot="header">
          <span>{{ currentStage.title }}</span
          ><span class="time">({{ currentTime }})</span>
        </div>
        <el-timeline>
          <el-timeline-item
            v-for="(stage, index) in currentStage.stages"
            :key="index"
            :color="new Date().getMinutes() >= stage.time ? '#0bbd87' : ''"
          >
            <div
              :style="
                new Date().getMinutes() >= `${stage.time}`
                  ? 'color:#0bbd87'
                  : ''
              "
            >
              <div>{{ stage.name }}</div>
              <div>{{ new Date().getHours() + ':' + stage.time }}</div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </div>
    <div class="right">
      <!-- 显示 对应地图 -->
      <div class="map-box">
        <!-- 地图 -->
        <div
          class="map"
          :style="{
            background: 'url(' + getMap(mapName) + ') no-repeat',
          }"
        ></div>
        <!-- 当前阶段 -->
        <div class="title">
          <span class="prefix">当前:</span>
          <span class="text">{{ currentStageTitle }}</span>
        </div>
        <!-- 下一阶段 -->
        <div class="nextTitle">
          <span class="prefix">下一个:</span>
          <span class="text">{{ nextStageTitle }}</span>
        </div>
        <!-- 当前阶段Dot -->
        <span
          :id="currentStageTitle"
          style="position: absolute"
          class="dot"
        ></span>
        <!-- 下一阶段Dot -->
        <span
          :id="nextStageTitle"
          v-if="nextStageTitle.split('/').length != 2"
          style="position: absolute"
          class="nextDot"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import fame from '@/assets/data/fame.json';
export default {
  name: 'Fame',
  data() {
    return {
      fameData: fame,
      currentStage: {}, // 当前阶段
      currentTime: '', // 当前时间
      currentStageTitle: '', // 当前阶段名称
      nextStageTitle: '', // 下一阶段名称
      mapName: '', // 地图名称
      timer: null, // 定时器
    };
  },
  mounted() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.getCurrentStage();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    getMap(mapName) {
      return require('../../assets/img/' + mapName + '.png');
    },
    getCurrentStage() {
      let HourType = new Date().getHours() % 2 ? 'odd' : 'even';
      let minType = new Date().getMinutes() < 30 ? 'Zero' : 'Half';
      // 根据当前(时、分)获取当前名望阶段
      this.currentStage = this.fameData[`${HourType}`][`${minType}`];
      // 当前地图名称
      this.mapName = this.currentStage.title;

      this.currentTime =
        new Date().getHours() +
        ':' +
        (new Date().getMinutes() < 10
          ? '0' + new Date().getMinutes()
          : new Date().getMinutes());

      // 获取到所有完成阶段的列表
      let filterFinishStageArr = this.currentStage.stages.filter((x) => {
        if (new Date().getMinutes() >= x.time) {
          return x;
        }
      });
      //  当前阶段名称
      this.currentStageTitle =
        filterFinishStageArr[filterFinishStageArr.length - 1].name;

      // 下一个阶段名称
      if (this.currentStage.stages.length > filterFinishStageArr.length) {
        // 本地图内 则显示下一个地点位置
        this.nextStageTitle =
          this.currentStage.stages[filterFinishStageArr.length].name;
      } else {
        // 如果跨地图的话 显示【地图/位置】
        if (minType == 'Zero') {
          console.log(this.fameData[`${HourType}`]);
          this.nextStageTitle =
            this.fameData[`${HourType}`].Half.title +
            '/' +
            this.fameData[`${HourType}`].Half.stages[0].position;
        } else {
          if (HourType == 'odd') {
            this.nextStageTitle =
              this.fameData.even.Zero.title +
              '/' +
              this.fameData.even.Zero.stages[0].position;
          } else {
            this.nextStageTitle =
              this.fameData.odd.Zero.title +
              '/' +
              this.fameData.odd.Zero.stages[0].position;
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes flash {
  0% {
    box-shadow: 0 0 10px 15px rgba(255, 0, 0, 0.8);
  }
  50% {
    box-shadow: 0 0 10px 15px rgba(255, 0, 0, 0.3);
  }
  100% {
    box-shadow: 0 0 10px 15px rgba(255, 0, 0, 0.8);
  }
}
@keyframes nextFlash {
  0% {
    box-shadow: 0 0 10px 15px rgba(11, 189, 135, 0.8);
  }
  50% {
    box-shadow: 0 0 10px 15px rgba(11, 189, 135, 0.3);
  }
  100% {
    box-shadow: 0 0 10px 15px rgba(11, 189, 135, 0.8);
  }
}
.fame-box {
  display: flex;
  flex-direction: row;
  min-height: calc(100vh - 152px);

  .left {
    width: 35%;
    margin-left: 5%;

    .time {
      margin-left: 10px;
    }

    .el-timeline {
      width: 160px;
      margin-left: 35%;
    }
    .el-card {
      height: 100%;
    }
  }

  .right {
    width: 55%;
    .map-box {
      height: 100%;
      margin-left: 5%;
      border: 1px solid #eee;
      position: relative;

      .map {
        margin-top: 33px;
        width: 100%;
        height: 100%;
        background-size: contain;
      }

      .title {
        .prefix {
          color: #ccc;
        }
        .text {
          margin-left: 5px;
          color: rgba(255, 0, 0, 0.8);
        }
        position: absolute;
        width: 200px;
        height: 30px;
        line-height: 30px;
        left: 1px;
        top: 1px;
        border: 1px dashed #eee;
      }

      .nextTitle {
        .prefix {
          color: #ccc;
        }
        .text {
          margin-left: 5px;
          color: rgba(11, 189, 135, 0.8);
        }
        position: absolute;
        width: 200px;
        height: 30px;
        line-height: 30px;
        right: 1px;
        top: 1px;
        border: 1px dashed #eee;
      }

      .dot {
        border-radius: 50%;
        width: 15px;
        height: 15px;
        background-color: rgba(255, 0, 0, 0.8);
        position: absolute;
        animation: flash 2s infinite;
      }

      .nextDot {
        border-radius: 50%;
        width: 15px;
        height: 15px;
        position: absolute;
        background-color: rgba(11, 189, 135, 0.8);
        animation: nextFlash 2s infinite;
      }

      // 百溪 - 单数小时,每整点进行
      #商家劫难 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      #保护庄稼 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      #祈送吉船 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      #商家劫难-再 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      #村长请求 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      #阻止借贷 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      #拯救村民 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      #强敌来阻 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      // 楚州 - 单数小时,每半点进行
      #援护山阳 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      #保卫难民 {
        top: 28%;
        left: 34%;
        position: absolute;
      }

      #护送盐车 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      #南辕恶霸 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      #稀世珍宝 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      // 烂柯山 - 双数小时,每整点进行
      #点燃烟花 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      #保护花灯 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      #击退黄仁笑 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      #再战凌天 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      #醉酒闹事 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      #帮助安济坊 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      #击败镜栖 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      #安抚工人 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      #物归原主 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      #卜家工头 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      // 晟江 - 双数小时,每半点进行
      #檐上君子 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      #击退林司豪 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      #击退黄七 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      #护送镖车 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      #鱼目混珠 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      #击退林司豪-再 {
        top: 0%;
        right: 0%;
        position: absolute;
      }

      #击退黄七-再 {
        top: 0%;
        right: 0%;
        position: absolute;
      }
    }
  }
}
</style>
