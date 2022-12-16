<script>
export default {
  props: {},
  data() {
    return {
      pagination: {
        list: [], // 分页数据(required)
        currentPage: 1, // 当前页码(required)
        total: 0, // 总数(required)
        pageSize: 50, // 分页数设定值
        size: 0, // 分页数实际值(比如设定pageSize为10，但最后一页只有7条记录，size为7)
        pages: 1, // 总页数
        startRow: 0, // 当前起始索引
        endRow: 0, // 当前结尾索引
      },
    };
  },
  computed: {},
  methods: {
    query() {
      if (this.queryMethod) {
        this.queryMethod(this.pagination).then((result) => {
          Object.assign(this.pagination, result);
        });
      }
    },
    togglePage(page) {
      this.pagination.currentPage = page;
      this.query();
    },
    changePageSize(pageSize) {
      this.pagination.pageSize = pageSize;
      this.query();
    },
  },
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped></style>
