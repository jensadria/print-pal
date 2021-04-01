<template>
  <button class="add-order" @click="showAddNewOrderModal = true">
    <i class="fas fa-plus fa-2x"></i>
  </button>
  <add-new-order-modal
    :show="showAddNewOrderModal"
    @close="showAddNewOrderModal = false"
  ></add-new-order-modal>
  <div class="container">
    <base-card>
      <h2>Cutting List</h2>

      <ul>
        <current-list-item
          v-for="product in currentProducts"
          :key="product"
          :product="product"
        >
        </current-list-item>
      </ul>
    </base-card>
  </div>
</template>

<script>
import CurrentListItem from '../cuttinglist/CurrentListItem.vue';
import AddNewOrderModal from '../cuttinglist/AddNewOrderModal.vue';

export default {
  components: {
    AddNewOrderModal,
    CurrentListItem,
  },
  data() {
    return {
      showAddNewOrderModal: false,
    };
  },
  computed: {
    currentProducts() {
      return this.$store.getters.getCurrentProducts;
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: left;
  margin-bottom: 1rem;
}

.add-order {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 4px solid var(--light-blue);
  background-color: #fff;
  margin: 1.25rem 0.5rem 0.5rem 1rem;
  cursor: pointer;
}

.add-order i {
  color: var(--light-blue);
}
</style>
