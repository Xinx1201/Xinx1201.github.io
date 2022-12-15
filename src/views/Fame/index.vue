<template>
  <div class="fame-box">
    <div class="left">
      <!-- 左侧为时间线 -->
      <el-card shadow="hover">
        <div slot="header">
          <span>{{ currentStage.title }}</span
          ><span class="time">({{ currentTime }})</span>
        </div>
        <el-timeline>
          <el-timeline-item
            v-for="(stage, index) in currentStage.stages"
            :key="index"
            :color="today.minute() >= stage.time ? '#0bbd87' : ''"
          >
            <div
              :style="today.minute() >= `${stage.time}` ? 'color:#0bbd87' : ''"
            >
              <div>{{ stage.name }}</div>
              <div>{{ today.hour() + ':' + stage.time }}</div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </div>
    <div class="right" v-if="false">
      <!-- 显示 对应地图 -->
      <div class="map-box">
        <!-- 地图 -->
        <div
          v-if="mapName"
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

        <div class="mapName">{{ currentStage.title }}</div>
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
import dayjs from 'dayjs';
import { dateToString } from '@/utils';
import fameData from '@/assets/data/fame.json';
export default {
  name: 'Fame',
  data() {
    return {
      fameData,
      currentStage: {}, // 当前阶段
      currentTime: '', // 当前时间
      currentStageTitle: '', // 当前阶段名称
      nextStageTitle: '', // 下一阶段名称
      mapName: '', // 地图名称
      timer: null, // 定时器

      today: undefined,
    };
  },
  mounted() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.today = dayjs();
      this.getCurrentStage();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    getMap(mapName) {
      if (mapName == '晟江') {
        return `https://tuchuangs.com/imgs/2022/12/11/43b5997d16c1d766.png`;
      } else if (mapName == '楚州') {
        return `https://tuchuangs.com/imgs/2022/12/11/b7bd56757d78c84b.png`;
      } else if (mapName == '百溪') {
        return `https://tuchuangs.com/imgs/2022/12/11/27257ea2ad0f1701.png`;
      } else if (mapName == '烂柯山') {
        return `https://tuchuangs.com/imgs/2022/12/11/d725304dcfa58848.png`;
      }
    },
    getCurrentStage() {
      let HourType = dayjs().hour() % 2 ? 'odd' : 'even';
      let minType = dayjs().minute() < 30 ? 'Zero' : 'Half';
      // 根据当前(时、分)获取当前名望阶段
      this.currentStage = this.fameData[`${HourType}`][`${minType}`];
      // 当前地图名称
      this.mapName = this.currentStage.title;

      this.currentTime = dateToString(dayjs().valueOf(), 'time');

      // 获取到所有完成阶段的列表
      let filterFinishStageArr = this.currentStage.stages.filter((x) => {
        if (dayjs().minute() >= x.time) {
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
@import '@/assets/style/Fame.scss';
</style>
