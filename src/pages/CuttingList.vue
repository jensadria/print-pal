<template>
  <div class="container">
    <cutting-list-header></cutting-list-header>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <!-- <current-list></current-list> -->
    <router-view v-else></router-view>
  </div>
</template>

<script>
import CuttingListHeader from '../components/cuttinglist/CuttingListHeader.vue';
// import CurrentList from '../components/cuttinglist/CurrentList.vue';

export default {
  data() {
    return {
      isLoading: false,
    };
  },
  components: {
    CuttingListHeader,
    // CurrentList,
    // AddNewOrderModal,
  },
  methods: {
    async loadProductsAndOrders() {
      this.isLoading = true;
      await this.$store.dispatch('LOAD_PRODUCTS');
      await this.$store.dispatch('LOAD_ORDERS');
      this.isLoading = false;
    },
  },
  created() {
    this.loadProductsAndOrders();
  },
};
</script>

<style scoped>
/* * {
  border: 0.1px dotted red;
} */
.container {
  display: flex;
  /* width: auto; */
  flex-direction: column;
}

/* .container > * {
  flex: 1 1 100%;
} */
</style>
