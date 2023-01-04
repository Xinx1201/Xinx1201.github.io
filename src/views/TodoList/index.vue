<template>
  <div class="flex-column flex-center todo">
    <el-input
      class="input"
      v-model="text"
      autofocus
      placeholder="请输入待办事件"
      @keyup.enter.native="submit"
    >
      <el-button
        v-if="!isEdit"
        slot="suffix"
        style="margin-right: -5px"
        type="primary"
        @click="submit"
        >提交</el-button
      >
      <template v-else>
        <el-button slot="suffix" style="margin-right: -5px" @click="cancel"
          >取消</el-button
        >
        <el-button
          slot="suffix"
          style="margin-right: -5px"
          type="primary"
          @click="submit"
          >修改</el-button
        >
      </template>
    </el-input>
    <el-card shadow="hover">
      <div slot="header">
        {{
          activeName == 'all'
            ? '全部'
            : activeName == 'undo'
            ? '未完成'
            : '已完成'
        }}
        {{
          items != []
            ? items.filter((x) =>
                this.activeName == 'all'
                  ? x
                  : this.activeName == 'undo'
                  ? x.isCheck == false
                  : x.isCheck == true
              ).length
            : [].length
        }}/{{ items.length }}项
      </div>
      <div
        class="item flex-row"
        v-for="(item, index) in items != []
          ? items.filter((x) =>
              this.activeName == 'all'
                ? x
                : this.activeName == 'undo'
                ? x.isCheck == false
                : x.isCheck == true
            )
          : []"
      >
        <div class="select">
          <el-checkbox v-model="item.isCheck"></el-checkbox>
        </div>
        <el-tooltip
          v-if="item.text.length > 24"
          class="item"
          effect="dark"
          :content="item.text"
          placement="top"
          tooltip-auto-show
        >
          <span :class="item.isCheck ? 'text selectText' : 'text'">{{
            item.text
          }}</span>
          <i v-if="item.isCheck" class="del" />
        </el-tooltip>
        <span :class="item.isCheck ? 'text selectText' : 'text'" v-else>{{
          item.text
        }}</span>
        <i v-if="item.isCheck" class="del" />
        <i
          @click="onClickEdit(item)"
          :class="item.isCheck ? 'iconSelect el-icon-edit' : 'el-icon-edit'"
        ></i>
        <i
          @click="onClickDel(item)"
          :class="item.isCheck ? 'iconSelect el-icon-delete' : 'el-icon-delete'"
        ></i>
      </div>
    </el-card>

    <!-- 底部切换栏 -->
    <div class="bottom">
      <el-tabs v-model="activeName" @tab-click="changeTab">
        <el-tab-pane label="全部" name="all"></el-tab-pane>
        <el-tab-pane label="未完成" name="undo"></el-tab-pane>
        <el-tab-pane label="已完成" name="finish"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
  name: 'TodoList',
  components: {},
  data() {
    return {
      text: '', // 待办事项
      activeName: 'all', // 当前激活标签
      items: [],
      source: {}, // 修改的数据
      isEdit: false, // 是否开始修改
    };
  },
  watch: {
    items: {
      handler(val) {
        this.saveToStorage(val);
      },
      deep: true,
    },
  },
  mounted() {
    this.changeTab({ name: 'all' });
  },
  methods: {
    cancel() {
      this.text = '';
      this.isEdit = false;
    },
    submit() {
      if (this.text == '') return;

      if (this.isEdit) {
        // 修改
        let index = this.items.findIndex((x) => x.id == this.source.id);
        this.items.splice(index, 1, {
          id: dayjs().valueOf(),
          isCheck: false,
          text: this.text,
        });

        // 恢复为新增
        this.isEdit = false;
      } else {
        // 新增
        this.items.unshift({
          id: dayjs().valueOf(),
          isCheck: false,
          text: this.text,
        });
      }

      // 清空输入的数据
      this.text = '';

      //  保存数据到localStorage中
      this.saveToStorage(this.items);
    },

    saveToStorage(val) {
      window.localStorage.setItem('todoList', JSON.stringify(val));
    },

    changeTab(val) {
      this.items = JSON.parse(window.localStorage.getItem('todoList'))
        ? JSON.parse(window.localStorage.getItem('todoList'))
        : [
            {
              id: 0,
              isCheck: false,
              text: '大战',
            },
            {
              id: 1,
              isCheck: false,
              text: '茶饼',
            },
            {
              id: 2,
              isCheck: false,
              text: '宠物奇遇',
            },
            {
              id: 3,
              isCheck: false,
              text: '马奶酒/抓马',
            },
          ];
    },

    onClickEdit(item) {
      if (item.isCheck) return;
      this.isEdit = true;
      this.source = this.items.find((x) => x.id == item.id);
      this.text = this.source.text;
    },

    onClickDel(item) {
      if (item.isCheck) return;
      let index = this.items.findIndex((x) => x.id == item.id);
      console.log(index);
      this.items.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  width: 500px;
  margin-bottom: 10px;
}
.bottom {
  width: 500px;
}
.el-card {
  width: 500px;
  min-height: 500px;
  max-height: 700px;
  overflow: auto;
  position: relative;

  .item {
    width: 100%;
    line-height: 50px;
    height: 50px;
    border-bottom: 1px solid #ebeef5;

    .select {
      width: 10%;
    }

    .selectText {
      color: #ccc;
      position: relative;
    }

    .del {
      width: 85%;
      display: inline-block;
      position: absolute;
      left: 12%;
      border-bottom: 1px solid #ccc;
    }

    .iconSelect {
      color: #ccc;
    }

    .el-icon-edit {
      margin-right: 10px;
    }

    .text {
      width: 90%;
      height: 50px;

      display: inline-block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
