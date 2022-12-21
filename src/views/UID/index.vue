<template>
  <div class="flex-column flex-ai-stretch">
    <Operation class="flex-none" @select="select" />
    <DataTable
      :tableData="
        filterUid ? uidData.filter((x) => x.uid == filterUid) : uidData
      "
      class="flex-auto"
    />
  </div>
</template>

<script>
import uidData from '@/assets/data/uid.json';
import Operation from './Operation.vue';
import DataTable from './DataTable.vue';
export default {
  name: 'UID',
  components: {
    Operation,
    DataTable,
  },
  data() {
    return {
      uidData,
      filterUid: '', // 筛选的uid
    };
  },
  methods: {
    select(form) {
      this.filterUid = form.uid;
    },
  },
};
</script>

<style lang="scss" scoped></style>
