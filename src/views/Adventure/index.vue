<template>
  <div class="adventure flex-column flex-center">
    <div class="operation is-flex flex-as-stretch flex-between">
      <div>
        <el-select
          filterable
          class="school"
          ref="school"
          v-model="school"
          placeholder="请选择门派"
          value-key="school"
        >
          <el-option
            v-for="item in schools"
            :key="item.school"
            :label="item.school"
            :value="item"
          >
            <span :style="{ color: item.color }">{{ item.school }}</span>
          </el-option>
        </el-select>
        <el-select
          filterable
          class="camp"
          ref="camp"
          v-model="camp"
          placeholder="请选择阵营"
          value-key="id"
        >
          <el-option
            v-for="item in pvps"
            :key="item.id"
            :label="item.camp"
            :value="item"
          >
            <span :style="{ color: item.color }">{{ item.camp }}</span>
          </el-option>
        </el-select>

        <el-input
          class="name mgl10"
          v-model="name"
          placeholder="请输入游戏id"
        ></el-input>
        <el-select
          class="mgl10"
          filterable
          v-model="server"
          placeholder="请选择"
        >
          <el-option-group
            v-for="group in servers"
            :key="group.zone"
            :label="group.zone"
          >
            <el-option
              v-for="item in group.options"
              :key="item.server"
              :label="item.server"
              :value="item.server"
            >
            </el-option>
          </el-option-group>
        </el-select>
      </div>
      <el-switch
        v-if="isRefresh"
        class="mgt10"
        v-model="type"
        :active-color="school.color"
        inactive-color="rgba(165,11,11,0.8)"
        active-text="角标"
        inactive-text="对勾"
      >
      </el-switch>
      <div>
        <el-button @click="onClickCheck('all')">一键完成</el-button>
        <el-button @click="onClickCheck('normal')">一键勾选普通奇遇</el-button>
        <el-button @click="onClickCheck('perfect')">一键勾选绝世奇遇</el-button>
      </div>
    </div>
    <Box ref="box" id="box" />
    <div class="show">
      <el-image
        v-show="false"
        style="width: 300px; height: 150px"
        :src="url"
        ref="preview"
        :preview-src-list="srcList"
      >
      </el-image>
    </div>
    <div class="export">
      <el-button @click="onClickExport" type="primary">导出图片</el-button>
    </div>
  </div>
</template>

<script>
import Box from './Box.vue';
import html2canvas from 'html2canvas';
import schools from '@/assets/data/school.json';
import servers from '@/assets/data/server.json';
import pvps from '@/assets/data/pvp.json';
export default {
  name: 'Adventure',
  components: {
    Box,
  },
  data() {
    return {
      servers,
      schools,
      pvps,
      type: true, // true为角标
      name: '', // 角色名
      server: '破阵子', // 服务器
      camp: '恶人谷',
      school: {
        id: '23',
        school: '霸刀',
        color: '#8D90D8',
        icon: 'https://img.jx3box.com/image/school/20.png',
      },
      isRefresh: true,

      // el-image
      url: '',
      srcList: [],
    };
  },
  watch: {
    school: {
      handler(val) {
        if (val) {
          this.isRefresh = false;
          // 改变选中后的颜色
          this.$refs.school.$el.children[0].children[0].style.color = val.color;
          this.$refs.box.changeColor(val);
          this.$nextTick(() => {
            this.isRefresh = true;
          });
        }
      },
    },
    camp: {
      handler(val) {
        if (val) {
          // 改变选中后的颜色
          this.$refs.camp.$el.children[0].children[0].style.color = val.color;
          this.$refs.box.changeCampColor(val);
        }
      },
    },
    type: {
      handler(val) {
        // true 角标 false 对勾
        // 改变完成表现形式
        this.$refs.box.changeShowType(val);
      },
    },
    name: {
      handler(val) {
        this.$refs.box.getName(val);
      },
    },
    server: {
      handler(val) {
        this.$refs.box.getServer(val);
      },
    },
  },
  mounted() {
    // 默认霸刀的颜色
    this.$refs.school.$el.children[0].children[0].style.color = '#8D90D8';
    // 默认恶人谷的颜色
    this.$refs.camp.$el.children[0].children[0].style.color = '#A01E1E';
  },
  methods: {
    onClickCheck(type) {
      this.$refs.box.check(type);
    },

    // 导出图片
    onClickExport() {
      this.srcList = [];
      html2canvas(document.querySelector('#box'), {
        useCORS: true,
        backgroundColor: '#FFF',
      }).then((canvas) => {
        const link = document.createElement('a'); // 创建一个超链接对象实例
        const event = new MouseEvent('click'); // 创建一个鼠标事件的实例
        link.download = `${this.name}奇遇.png`; // 设置要下载的图片的名称
        link.href = canvas.toDataURL(); // 将图片的URL设置到超链接的href中

        // html2canvas与el-image配合使用
        this.url = link.href;
        this.srcList.push(link.href);
        setTimeout(() => {
          this.$refs.preview.showViewer = true;
        }, 100);

        link.dispatchEvent(event); // 触发超链接的点击事件
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.adventure {
  min-width: 1600px;
  width: 100%;
  position: relative;

  .show {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .export {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
.operation {
  margin-bottom: 10px;
  .camp {
    margin-left: 10px;
  }

  .name {
    width: 217px;
  }

  .el-switch {
    align-items: center;
    justify-content: center;
  }
}
</style>
