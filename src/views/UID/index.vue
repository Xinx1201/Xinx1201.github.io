<template>
  <div class="flex-column flex-ai-stretch">
    <Operation class="flex-none" @select="select" />
    <DataTable
      :tableData="
        isOnlySeeVariation
          ? uidData.filter((x) => x.variation == true)
          : filterUid
          ? uidData.filter((x) => x.uid == filterUid)
          : uidData
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
      isOnlySeeVariation: false, // 是否仅看变异马驹
    };
  },
  methods: {
    select(form) {
      this.filterUid = form.uid;
      this.isOnlySeeVariation = form.onlySeeVariation;
    },
  },
};
</script>

<style lang="scss" scoped></style>
