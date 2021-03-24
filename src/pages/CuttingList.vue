<template>
  <div class="container">
    <base-button @click="showAddNewOrderModal = true">
      Add New Order
    </base-button>
    <add-new-order-modal
      :show="showAddNewOrderModal"
      @close="showAddNewOrderModal = false"
    ></add-new-order-modal>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <current-list v-else></current-list>
  </div>
</template>

<script>
import AddNewOrderModal from '../components/cuttinglist/AddNewOrderModal.vue';
import CurrentList from '../components/cuttinglist/CurrentList.vue';

export default {
  data() {
    return {
      isLoading: false,
      showAddNewOrderModal: false,
    };
  },
  components: {
    CurrentList,
    AddNewOrderModal,
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
