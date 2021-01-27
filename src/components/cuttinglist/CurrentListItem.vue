<template>
  <li>
    <div class="product-item">
      <div class="due">
        <h3>24/2</h3>
      </div>
      <div class="amount">
        <h3>{{ sheetsTotal }} x {{ product.name }}</h3>
        <h4>
          {{ flatSheetsRequired }} Flat Sheets ( {{ product.noOutFlatSheet }}
          out )
        </h4>
      </div>
      <div class="orders">
        <add-edit-order-modal
          :show="showAddEditOrderModal"
          @close="showAddEditOrderModal = false"
          :id="product.id"
        ></add-edit-order-modal>
        <div v-if="orderAdded">
          <div v-for="order in orders" :key="order">
            {{ order.petNumber }} {{ order.packs }} {{ order.bulks }}
            {{ order.dueDate }} {{ order.dueTime }}
          </div>
        </div>
        <div class="add-order">
          <button @click="showAddEditOrderModal = true">
            Add Order
          </button>
        </div>
      </div>
      <div class="buttons">
        <i
          class="fas fa-minus-circle delete"
          @click="deleteItem(index - 1)"
        ></i>
      </div>
    </div>
  </li>
</template>

<script>
import AddEditOrderModal from '../cuttinglist/AddEditOrderModal.vue';

export default {
  components: { AddEditOrderModal },

  props: ['product', 'index'],
  data() {
    return {
      showAddEditOrderModal: false,
      orderAdded: false,
      orders: [],
    };
  },
  computed: {
    flatSheetsRequired() {
      const { packs, bulks, packQty, bulkQty, noOutFlatSheet } = this.product;

      const sheetsFromPacks = (packs * packQty) / noOutFlatSheet;
      const sheetsFromBulks = (bulks * bulkQty) / noOutFlatSheet;

      return Math.ceil(sheetsFromPacks + sheetsFromBulks);
    },
    sheetsTotal() {
      return this.flatSheetsRequired * this.product.noOutFlatSheet;
    },
  },
  methods: {
    deleteItem(index) {
      this.$store.dispatch('deleteItem', index);
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
  display: flex;
  padding: 1rem;
}

li:nth-child(odd) {
  background-color: lightgray;
}

li:hover {
  background-color: var(--very-light-blue);
}

.product-item {
  display: flex;
  width: 100%;
}

.due {
  flex: 1;
}

.amount {
  text-align: left;
  flex: 5;
}

.orders {
  flex: 3;
}

.orders-input {
  text-align: left;
  border-left: 1px solid #000;
  padding-left: 1rem;
  display: flex;
}

.orders-input input:first-child {
  flex: 4;
}

.orders-input input:not(:first-child) {
  width: 50px;
}

.add-order {
  text-align: left;
}

.buttons {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.edit {
  color: green;
  margin-bottom: 1rem;
}

.delete {
  color: maroon;
}
</style>
