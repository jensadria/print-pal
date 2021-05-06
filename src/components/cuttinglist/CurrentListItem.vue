<template>
  <li>
    <div class="product-item">
      <div class="due">
        <h3>{{ earliestDueDate === 'null' ? '' : earliestDueDate }}</h3>
      </div>
      <div class="amount">
        <h2>{{ sheetsTotal }} x {{ product.name }}</h2>
        <h3>
          {{ flatSheetsRequired }} Flat Sheets ( {{ product.noOutFlatSheet }}
          out )
        </h3>
        <h4>{{ packs }} Packs (of {{ product.packQty }})</h4>

        <h4>{{ bulks }} Bulks (of {{ product.bulkQty }})</h4>
      </div>
      <div class="orders">
        <add-order-modal
          :show="showAddOrderModal"
          @close="showAddOrderModal = false"
          :id="product.id"
          :name="product.name"
        ></add-order-modal>

        <div>
          <current-list-item-order
            v-for="order in orders"
            :key="order"
            :order="order"
          ></current-list-item-order>
        </div>

        <div>
          <button class="add-order" @click="showAddOrderModal = true">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
// import { format } from 'date-fns';

import AddOrderModal from '../cuttinglist/AddOrderModal.vue';
import CurrentListItemOrder from '../cuttinglist/CurrentListItemOrder.vue';

export default {
  components: { AddOrderModal, CurrentListItemOrder },

  props: ['product'],
  data() {
    return {
      showAddOrderModal: false,
    };
  },
  computed: {
    orders() {
      return this.$store.getters.getActiveOrders.filter(
        (order) => order.productId === this.product.id
      );
    },
    earliestDueDate() {
      const allOrders = [...this.orders];
      const ordersSortedByDueDate = allOrders.sort(
        (order1, order2) => order2.dueDate - order1.dueDate
      );

      return ordersSortedByDueDate[0].dueDate;
    },
    packs() {
      return this.orders.reduce((acc, order) => acc + order.packs, 0);
    },
    bulks() {
      return this.orders.reduce((acc, order) => acc + order.bulks, 0);
    },
    flatSheetsRequired() {
      const { packQty, bulkQty, noOutFlatSheet } = this.product;

      const sheetsFromPacks = (this.packs * packQty) / noOutFlatSheet;
      const sheetsFromBulks = (this.bulks * bulkQty) / noOutFlatSheet;

      return Math.ceil(sheetsFromPacks + sheetsFromBulks);
    },
    sheetsTotal() {
      return this.flatSheetsRequired * this.product.noOutFlatSheet;
    },
  },
  methods: {
    markAllComplete() {
      this.$store.dispatch('deleteItem', this.product);
    },
  },
};
</script>

<style scoped>
/* * {
  border: 0.1px dotted red;
} */
li {
  list-style: none;
  display: flex;
  padding: 1rem;
}

li:nth-child(odd) {
  background-color: lightgray;
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
  text-align: left;
}

.buttons {
  flex: 1;
  display: grid;
  place-items: top;
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
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 2px solid var(--light-blue);
  background-color: #fff;
  margin: 0.25rem;
  cursor: pointer;
}

.add-order:active {
  transform: scale(0.9);
}

.add-order i {
  color: var(--light-blue);
}
</style>
