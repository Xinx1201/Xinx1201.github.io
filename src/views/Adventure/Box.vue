<template>
  <div class="box">
    <el-card
      class="card"
      shadow="hover"
      v-for="(item, index) in adventure"
      :key="index"
      @click.native="onClickIsFinish(item)"
    >
      <template v-if="item.type != 99">
        <!-- 背景 -->
        <img :src="item.bg" class="bg" />
        <!-- 中间 -->
        <img :src="item.img" class="cover" />
        <!-- 文字 -->
        <img :src="item.text" class="text" />

        <!-- 右上角上角已完成tag -->
        <div
          v-if="item.isFinish && type"
          :style="{
            backgroundColor: school
              ? schools.find((x) => x.school == school).color
              : '#8D90D8',
          }"
          class="finish"
        >
          已完成
        </div>

        <!-- 勾选√选中状态 -->
        <img
          v-if="item.isFinish && !type"
          src="https://s2.loli.net/2023/01/05/ueZFN1nH2WVOjRp.png"
          class="check"
        />
      </template>

      <template v-else-if="item.name == 'first'">
        <div class="first">
          <div class="logo mgt10">
            <img :src="schools.find((x) => x.school == school).icon" alt="" />
          </div>
          <div class="name">{{ name }}</div>
          <div class="server">{{ server }}</div>
        </div>
      </template>

      <template v-else-if="item.name == 'end'">
        <div class="container">
          <div class="normal flex-row flex-center">
            <img src="https://s2.loli.net/2023/01/05/oQCIagRz8FTOkcl.png" />
            <div>
              {{
                adventure.filter((x) => x.type == 1 && x.isFinish == true)
                  .length
              }}/{{ adventure.filter((x) => x.type == 1).length }}
            </div>
          </div>
          <div class="perfect flex-row flex-center">
            <img src="https://s2.loli.net/2023/01/05/EAYSoJusTWM9Lwv.png" />
            <div>
              {{
                adventure.filter((x) => x.type == 0 && x.isFinish == true)
                  .length
              }}/{{ adventure.filter((x) => x.type == 0).length }}
            </div>
          </div>
          <div class="time">
            {{ new Date().toLocaleDateString() }}
          </div>
        </div>
      </template>
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
      name: '用户名', // 角色名
      server: '破阵子', // 服务器
      type: true, // 角标形式
      school: '霸刀', // 当前选中的门派
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
          if (
            this.adventure
              .filter((x) => x.type !== 99)
              .every((x) => x.isFinish == true)
          ) {
            this.adventure
              .filter((x) => x.type !== 99)
              .forEach((x) => {
                x.isFinish = false;
              });
          } else {
            this.adventure
              .filter((x) => x.type !== 99)
              .forEach((x) => {
                x.isFinish = true;
              });
          }
          break;
        case 'normal':
          // 如果全部选中 置为未选中状态
          if (this.adventure.every((x) => x.isFinish == true)) {
            this.adventure
              .filter((x) => x.type !== 99)
              .forEach((x) => {
                x.isFinish = false;
              });
          }
          // 勾选普通奇遇
          this.adventure
            .filter((x) => x.type !== 99)
            .forEach((x) => {
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
            this.adventure
              .filter((x) => x.type !== 99)
              .forEach((x) => {
                x.isFinish = false;
              });
          }
          // 勾选绝世奇遇
          this.adventure
            .filter((x) => x.type !== 99)
            .forEach((x) => {
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
      this.adventure
        .filter((x) => x.type !== 99)
        .find((x) => x.name == item.name).isFinish = !item.isFinish;
    },

    // 获得角色名称
    getName(val) {
      this.name = val;
    },

    // 获得服务器
    getServer(val) {
      this.server = val;
    },

    // 完成表现形式修改
    changeShowType(val) {
      // true 角标 false 对勾
      this.type = val;
    },

    // 阵营图片
    changeCampColor(val) {
      let str = `camp_${val.id}_open`;

      // 黑白路替换掉对应的图片
      this.adventure.forEach((x) => {
        if (x.camp) {
          x.img = x.img.replace(x.img.match(/camp_(\S*)_open/)[0], str);
        }
      });
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

  .first {
    height: 140px;
    line-height: 30px;
    text-align: center;
    .logo {
      height: 40%;
      img {
        width: 57px;
        height: 57px;
      }
    }
    .name,
    .server {
      font-size: 20px;
      height: 25%;
      font-family: 'jx3', '华文行楷', '华文隶书', 'Microsoft Yahei', '微软雅黑',
        'SimSun', 'SimHei';
    }
    .server {
      font-size: 30px;
    }
  }

  .container {
    height: 140px;
    line-height: 30px;
    text-align: center;

    img {
      height: calc(25px * 0.75);
      width: calc(114px * 0.75);
    }
    .normal,
    .perfect,
    .time {
      line-height: 45px;
      font-family: 'jx3', '华文行楷', '华文隶书', 'Microsoft Yahei', '微软雅黑',
        'SimSun', 'SimHei';
    }

    .normal {
      margin-top: 5px;
    }

    .time {
      font-size: 25px;
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
      z-index: 99;
    }

    .check {
      position: absolute;
      top: 0;
      height: 120px;
      left: 30%;
      z-index: 88;
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
