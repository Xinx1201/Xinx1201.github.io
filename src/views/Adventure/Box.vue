<template>
  <div class="box">
    <el-card
      class="card"
      shadow="hover"
      v-for="(item, index) in adventure"
      :key="index"
      @click.native="onClickIsFinish(item)"
    >
      <!-- 背景 -->
      <img :src="item.bg" class="bg" />
      <!-- 中间 -->
      <img :src="item.img" class="cover" />
      <!-- 文字 -->
      <img :src="item.text" class="text" />
      <div
        v-if="item.isFinish"
        :style="{
          backgroundColor: school
            ? schools.find((x) => x.school == school).color
            : '#8D90D8',
        }"
        class="finish"
      >
        已完成
      </div>
    </el-card>
  </div>
</template>

<script>
import adventure from '@/assets/data/adventure.json';
import schools from '@/assets/data/school.json';
export default {
  name: 'AdventureBox',
  props: {},
  data() {
    return {
      adventure,
      schools,
      school: '', // 当前选中的门派
    };
  },
  mounted() {
    // 为每个奇遇添加是否完成的标记
    this.adventure = this.adventure.map((item) => {
      return {
        ...item,
        isFinish: false,
      };
    });
  },
  methods: {
    check(type) {
      switch (type) {
        case 'all':
          // 勾选全部
          if (this.adventure.every((x) => x.isFinish == true)) {
            this.adventure.forEach((x) => {
              x.isFinish = false;
            });
          } else {
            this.adventure.forEach((x) => {
              x.isFinish = true;
            });
          }
          break;
        case 'normal':
          // 如果全部选中 置为未选中状态
          if (this.adventure.every((x) => x.isFinish == true)) {
            this.adventure.forEach((x) => {
              x.isFinish = false;
            });
          }
          // 勾选普通奇遇
          this.adventure.forEach((x) => {
            if (x.type == 1) {
              x.isFinish = !x.isFinish;
            } else {
              x.isFinish = false;
            }
          });
          break;
        case 'perfect':
          // 如果全部选中 置为未选中状态
          if (this.adventure.every((x) => x.isFinish == true)) {
            this.adventure.forEach((x) => {
              x.isFinish = false;
            });
          }
          // 勾选绝世奇遇
          this.adventure.forEach((x) => {
            if (x.type == 0) {
              x.isFinish = !x.isFinish;
            } else {
              x.isFinish = false;
            }
          });
          break;
        default:
          break;
      }
    },
    onClickIsFinish(item) {
      this.adventure.find((x) => x.name == item.name).isFinish = !item.isFinish;
    },
    changeColor(val) {
      this.school = val.school;

      let str = `school_${val.id}_open`;

      // 橙武奇遇替换掉对应的图片
      this.adventure.forEach((x) => {
        if (x.cw) {
          x.img = x.img.replace(x.img.match(/school_(\S*)_open/)[0], str);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  border: 1px solid #ebeef5;
  width: 1300px;

  // 去除card自带的padding
  ::v-deep {
    .el-card__body,
    .el-main {
      padding: 0px;
    }
  }

  .card {
    display: inline-block;
    width: 140px;
    height: 140px;
    line-height: 140px;
    position: relative;

    .finish {
      position: absolute;
      right: -15%;
      top: 5%;
      width: 80px;
      line-height: 25px;
      overflow: hidden;
      font-size: 12px;
      transform: rotate(45deg);
      color: #fff;
    }

    &.card {
      margin: 5px;
    }

    .bg {
      width: 100%;
      height: 100%;
    }

    .cover {
      position: absolute;
      z-index: 2;
      width: 100%;
      height: 100%;
      left: 0;
    }

    .text {
      position: absolute;
      z-index: 1;
      left: 0;
      bottom: 0px;
      width: 50%;
      margin-left: 25%;
    }
  }
}
</style>
