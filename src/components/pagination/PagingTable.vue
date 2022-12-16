<template>
  <div>
    <slot name="header">
      <div class="flex-row flex-between mgtb5">
        <el-pagination
          @size-change="changePageSize"
          :page-sizes="optPageSize"
          :page-size="pageSize"
          layout="sizes"
          class="page-size"
        />
        <div>
          当前显示第 {{ pagination.startRow }} 至 {{ pagination.endRow }} 项，共
          {{ pagination.total }} 项。
        </div>
      </div>
    </slot>
    <slot :list="list" />
    <slot name="footer">
      <div class="flex-row mgtb5">
        <div class="flex-auto" />
        <el-pagination
          class="pull-right"
          @current-change="togglePage"
          :current-page="currentPage"
          :page-count="lastPage"
          layout="prev, pager, next, jumper"
        />
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      required: true,
    },
    optPageSize: {
      type: Array,
      default() {
        return [50, 100, 150, 200];
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    list() {
      return this.pagination.list || [];
    },
    pageSize() {
      return this.pagination.pageSize || 50;
    },
    firstPage() {
      return this.pagination.firstPage || 1;
    },
    lastPage() {
      return (
        this.pagination.lastPage ||
        Math.ceil(this.pagination.total / this.pagination.pageSize) ||
        1
      );
    },
    total() {
      return this.pagination.total || 0;
    },
    currentPage() {
      return this.pagination.currentPage;
    },
  },
  methods: {
    togglePage(page) {
      this.$emit('togglePage', page);
    },
    changePageSize(pageSize) {
      this.$emit('changePageSize', pageSize);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.page-size {
  margin-left: -10px;
}
</style>
